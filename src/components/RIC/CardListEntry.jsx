import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import '../../styles.css';
// import RatingStars from './RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';
import { generateAverage } from './HelperFunctions';
import Modal from './Modal';
import ProductContext from '../../contexts/ProductContext';

function CardListEntry({
  relatedItem, noModal, removeCard, activeIndex,
}) {
  const [thumbnail, setThumbNail] = useState('');
  const [rating, setRating] = useState('');
  const [clicked, setClick] = useState(false);
  const [onSale, setSale] = useState(null);
  const [modal, setModal] = useState(false);
  const product = useContext(ProductContext);
  const prodDes = { product };
  const prod = prodDes.product;
  const [prodFeatures, setProdFeatures] = useState([]);

  useEffect(() => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedItem.id}/styles`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then(({ data }) => {
        // console.log(data.results);
        const sale = data.results[0].sale_price;
        if (sale !== null) {
          setSale(sale);
        }
        const photo = data.results[0].photos[0].thumbnail_url;
        if (photo === null) {
          setThumbNail('/Users/aidan/Programming/HackReactor/FEC/FEC-Main/assets/Image_not_available.png');
        } else {
          setThumbNail(photo);
        }
      })
      .then(() => axios
        .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', {
          headers: {
            Authorization: process.env.AUTH_TOKEN,
          },
          params: {
            product_id: relatedItem.id,
          },
        }))
      .then((results) => {
        // console.log(results.data.ratings);
        const avgRating = generateAverage(results.data.ratings);
        setRating(avgRating);
      })
      .catch((err) => console.log(`Error ${err} in CardListEntry axios get request`));
  }, []);

  useEffect(() => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prod.id}`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then((result) => {
        // console.log(result.data.features);
        setProdFeatures(result.data.features);
      });
  }, []);

  return (
    <div>
      {thumbnail.length === 0 || rating.length === 0 ? <Loading />
        : (
          <div className="relative grid-cols-3 grid-rows-3 transition-transform" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            <div className="shrink-0 bg-[#EFE1CE] grid rounded-lg shadow-xl hover:shadow-indigo-500/40 h-96 w-48">
              <div className="bg-white grid rounded-lg rounded-b-none h-60 w-48 content-center">
                <img src={thumbnail} alt="item default" className="rounded-lg max-h-56 w-40 justify-self-center content-center shadow-lg object-cover" />
              </div>
              <div className="ml-2 mr-2">
                <div className="text-[#798EA4] text-lg">{relatedItem.category}</div>
                <div className="text-black text-2xl">{relatedItem.name}</div>
                {onSale === null
                  ? <div className="text-[#798EA4] text-sm">{`$${relatedItem.default_price}`}</div>
                  : (
                    <div>
                      <div className="text-red-500 line-through text-sm">{relatedItem.default_price}</div>
                      <div>{onSale}</div>
                    </div>
                  )}
                <div className="text-[#798EA4] text-sm">{rating}</div>
              </div>
              {noModal === undefined && (
              <button
                className="absolute text-black hover:text-[#926AA6] hover:underline hover:cursor-pointer w-fit text-xs bottom-7 right-2"
                type="button"
                onClick={() => {
                  setModal(!modal);
                }}
              >
                Compare
              </button>
              )}
            </div>
            {noModal === undefined
              ? (
                <div>
                  {!clicked
                    ? (
                      <button
                        type="button"
                        onClick={() => {
                          setClick(!clicked);
                        }}
                        tabIndex={0}
                        onKeyPress={() => {
                          setClick(!clicked);
                        }}
                      >
                        <FontAwesomeIcon icon={faStar} style={{ color: '#ffffff' }} className="absolute top-2 right-2" />
                        <FontAwesomeIcon icon={farStar} style={{ color: '#000000' }} className="absolute top-2 right-2" />
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        onClick={() => {
                          setClick(!clicked);
                        }}
                        tabIndex={0}
                        onKeyPress={() => {
                          setClick(!clicked);
                        }}
                      >
                        <FontAwesomeIcon icon={faStar} style={{ color: '#fff700' }} className="absolute top-2 right-2" />
                        <FontAwesomeIcon icon={farStar} style={{ color: '#000000' }} className="absolute top-2 right-2" />
                      </button>
                    )}
                </div>
              )
              : (
                <button
                  type="button"
                  onClick={() => {
                    removeCard(relatedItem);
                  }}
                  tabIndex={0}
                  onKeyPress={() => {
                    removeCard(relatedItem);
                  }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#000000' }} className="absolute top-2 right-2" />
                </button>
              )}
          </div>
        )}
      <div className="">
        {noModal === undefined && modal && (
        <Modal
          relatedItem={relatedItem}
          modal={modal}
          setModal={setModal}
          prodFeatures={prodFeatures}
          prod={prod}
        />
        )}
      </div>
    </div>
  );
}

export default CardListEntry;