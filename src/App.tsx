import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import app from "./app.module.css";
import { Cats } from "./components/Cats";
import { useloadCat } from "./components/LoadCats";
import Loading from "./components/Loading";

export function App() {
  const { infoCat, loadCat } = useloadCat();
  const [isLoading, setIsLoading] = useState(false);

  const initialLoading = () => {
    setIsLoading(true);
  };

  return (
    <InfiniteScroll
      className={[app.main, "cnt"].join(" ")}
      dataLength={infoCat.length}
      next={loadCat}
      hasMore={true}
      loader={<Loading></Loading>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <h1 className={app.ttl}>
        <a href="">
          Facts <span>Cats</span>
        </a>
      </h1>
      {!isLoading && (
        <div className={app.contLoad}>
          <Loading></Loading>
        </div>
      )}
      {infoCat.map((_, index) => (
        <Cats
          key={index}
          index={index}
          initialLoading={initialLoading}
          fact={infoCat[index].fact}
          url={infoCat[index].url}
        />
      ))}
    </InfiniteScroll>
  );
}
