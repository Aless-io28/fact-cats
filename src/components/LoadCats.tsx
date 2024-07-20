import { useEffect, useState } from "react";

export function useloadCat() {
  const URL_CAT_FACT = "https://catfact.ninja/fact";
  const [infoCat, setInfoCat] = useState<{ fact: string; url: string }[]>([]);

  const loadCat = async () => {
    const promises = [];
    for (let i = 0; i < 9; i++) {
      promises.push(
        fetch(URL_CAT_FACT)
          .then((res) => res.json())
          .then((data) => {
            const { fact } = data;
            let words = fact.replace(/%/g, "").replace(/"/g, "%20");
            words = words.split(" ", 3).join("%20");
            const urlImage = `https://cataas.com/cat/says/${words}?fontSize=50&fontColor=white`;

            return { fact, url: urlImage };
            // return fetch(urlImage)
            //   .then((res) => res.json())
            //   .then((data) => {
            //     const { _id } = data;
            //     return { fact, url: _id };
            //   });
          })
          .catch((err) => {
            console.log(err);
            i--;
          })
      );
    }

    const catFacts = await Promise.all(promises);
    setInfoCat((prevInfoCats) => [...prevInfoCats, ...catFacts] as any);
  };

  useEffect(() => {
    loadCat();
  }, []);

  return {
    infoCat,
    loadCat,
  };
}
