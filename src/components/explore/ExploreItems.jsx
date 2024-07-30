import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";
import LoadMore from "../UI/LoadMore";
import AOS from "aos";

const ExploreItems = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  async function fetchExplored() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedValue}`
    );
    setItem(data);
    setIsLoading(false);
  }
  const loadMoreCount = 4;

  const { numberItems, loadMoreItems } = LoadMore(loadMoreCount);

  const itemsDisplayed = numberItems + 8;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [item]);

  useEffect(() => {
    fetchExplored(selectedValue);
  }, [selectedValue]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton height={400} width={300} />
            </div>
          ))
        : item.slice(0, itemsDisplayed).map((collections, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade-in"
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${collections.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={collections.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {collections.expiryDate && (
                  <Countdown
                    key={collections.id}
                    expiryDate={collections.expiryDate}
                  />
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${collections.nftId}`}>
                    <img
                      src={collections.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${collections.nftId}`}>
                    <h4>{collections.title}</h4>
                  </Link>
                  <div className="nft__item_price">{collections.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{collections.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {itemsDisplayed < item.length ? (
          <Link
            to=""
            onClick={() => loadMoreItems(item.length)}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
