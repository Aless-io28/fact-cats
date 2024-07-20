import { useEffect, useState } from "react";
import cat from "./cat.module.css";

const URL_CAT_FACT = "https://catfact.ninja/fact";
const URL_CAT_IMG = "https://cataas.com/cat/";

type Props = {
  val: number;
  load: (i: number) => void;
};

export function Cat({ val, load }: Props) {
  const [fact, setFact] = useState("");
  const [urlCat, setUrlCat] = useState("");

  useEffect(() => {
    fetch(URL_CAT_FACT)
      .then((res) => res.json())
      .then((data) => setFact(data.fact));
  }, []);

  useEffect(() => {
    if (!fact) return;
    const words = fact.split(" ", 3).join(" ");
    const urlImage = `https://cataas.com/cat/says/${words}?fontSize=50&fontColor=red&json=true`;
    fetch(urlImage)
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response;
        setUrlCat(_id);
      });
    load(val);
  }, [fact]);

  return (
    <>
      <section className={cat.scCat} data-val={val}>
        {fact && <p>{fact}</p>}
        {urlCat && <img src={`${URL_CAT_IMG}${urlCat}`} />}
      </section>
    </>
  );
}
