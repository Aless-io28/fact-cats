import { useEffect, useState } from "react";
import cat from "./cat.module.css";
import Loading from "./Loading";

const URL_CAT_IMG = "https://cataas.com/cat/";

type Props = {
  fact: String;
  url: string;
  index: number;
  initialLoading: () => void;
};

export function Cats({ fact, url, index, initialLoading }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setIsLoading(false);
    image.onerror = () => setIsLoading(false);
    // image.src = `${URL_CAT_IMG}${url}`;
    image.src = `${url}`;
    initialLoading();
  }, [url]);

  return (
    <>
      <section className={cat.scCat}>
        {fact && <p>{fact}</p>}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loading></Loading>
          </div>
        )}
        {!isLoading && url && <img src={`${url}`} />}
      </section>
    </>
  );
}
