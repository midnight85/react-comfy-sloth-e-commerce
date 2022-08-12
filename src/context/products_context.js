import axios from "axios";
import React, {useContext, useEffect, useReducer} from "react";
import reducer from "../reducers/products_reducer";
import {products_url as url} from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {
    id: "recNZ0koOqEmilmoz",
    stock: 10,
    price: 59999,
    shipping: true,
    featured: true,
    colors: ["#000", "#ff0000"],
    category: "living room",
    images: [
      {
        id: "attFsmagNpnmXVW6M",
        width: 1280,
        height: 924,
        url: "https://dl.airtable.com/.attachments/d42fd61c4d1ae2a02afe29114bd0fef3/d312dda5/product-2.jpg?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=f36dfa8c9cd7868e",
        filename: "product-2.jpg",
        size: 195175,
        type: "image/jpeg",
        thumbnails: {
          small: {
            url: "https://dl.airtable.com/.attachmentThumbnails/e32f735137754991c1ed721daeefe5c8/83e68c3d?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=651944662fd0acb9",
            width: 50,
            height: 36,
          },
          large: {
            url: "https://dl.airtable.com/.attachmentThumbnails/65708b701baa3a84883ad48301624b44/2de058af?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=25f950af1ab271a9",
            width: 709,
            height: 512,
          },
          full: {
            url: "https://dl.airtable.com/.attachmentThumbnails/d094abe30e934cd9d87062d27dcff51b/74010e70?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=5245f47e4392b924",
            width: 3000,
            height: 3000,
          },
        },
      },
      {
        id: "atthGte0RMjewvmzw",
        width: 1000,
        height: 667,
        url: "https://dl.airtable.com/.attachments/531463b9203cf77dde1a4ba01a155259/74f19d04/extra-1.jpeg?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=adc50816da906566",
        filename: "extra-1.jpeg",
        size: 102108,
        type: "image/jpeg",
        thumbnails: {
          small: {
            url: "https://dl.airtable.com/.attachmentThumbnails/88e6ab934f9e3804e0532e5558e01c0a/bb105ce0?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=82200e80a802a405",
            width: 54,
            height: 36,
          },
          large: {
            url: "https://dl.airtable.com/.attachmentThumbnails/abce548dfae2a3f2ab50de0d2167a678/ff471b64?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=b2d61b2463998186",
            width: 768,
            height: 512,
          },
          full: {
            url: "https://dl.airtable.com/.attachmentThumbnails/447b7a5ec2a0d30dd1287ce1efa6b41d/01a77ca3?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=a5a1286598490460",
            width: 3000,
            height: 3000,
          },
        },
      },
      {
        id: "atthQYTA30SIf0rIg",
        width: 1000,
        height: 714,
        url: "https://dl.airtable.com/.attachments/6ee299084de403c89180798387866dcb/a3e4d19c/extra-2.jpeg?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=d130abaaf235604a",
        filename: "extra-2.jpeg",
        size: 84418,
        type: "image/jpeg",
        thumbnails: {
          small: {
            url: "https://dl.airtable.com/.attachmentThumbnails/dd2b760a017218702c2eaef6c093797f/e348fac1?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=a75d708fbf0448ab",
            width: 50,
            height: 36,
          },
          large: {
            url: "https://dl.airtable.com/.attachmentThumbnails/eab193cf3194fb60c4ab4d2b25f83c20/74054d36?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=1cbad3b815073280",
            width: 717,
            height: 512,
          },
          full: {
            url: "https://dl.airtable.com/.attachmentThumbnails/213773f542d92388bda1c1337060ece5/86ef717d?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=03bf282e3eab393c",
            width: 3000,
            height: 3000,
          },
        },
      },
      {
        id: "attKUNrBH79MoscRA",
        width: 1000,
        height: 650,
        url: "https://dl.airtable.com/.attachments/90b9f8136775d56a0fc8080341f03f49/939a5566/extra-3.jpeg?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=678ccf1db493e2be",
        filename: "extra-3.jpeg",
        size: 107838,
        type: "image/jpeg",
        thumbnails: {
          small: {
            url: "https://dl.airtable.com/.attachmentThumbnails/3a2ca227e67ba3c60b7b8ac3d3ca0d3f/68ad40f8?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=a49de3694dc5140b",
            width: 55,
            height: 36,
          },
          large: {
            url: "https://dl.airtable.com/.attachmentThumbnails/25beec7bfe738a1bf8f3e99bc614d930/43ea22c4?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=88d4ee93cb9ed094",
            width: 788,
            height: 512,
          },
          full: {
            url: "https://dl.airtable.com/.attachmentThumbnails/71e42deda582d7eb56056c213460d06a/5cfbac2a?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=2291dcee5996fc56",
            width: 3000,
            height: 3000,
          },
        },
      },
      {
        id: "attG3c7TdqIyM1BZ7",
        width: 1000,
        height: 667,
        url: "https://dl.airtable.com/.attachments/3a17a255e0967079a573f65ee32cf00d/8b09449b/extra-4.jpeg?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=5ac46ddc6e6883a0",
        filename: "extra-4.jpeg",
        size: 99481,
        type: "image/jpeg",
        thumbnails: {
          small: {
            url: "https://dl.airtable.com/.attachmentThumbnails/78c09d2f5e51d6e1a5988c3bda02fee8/183cd23d?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=4afcf64641dba718",
            width: 54,
            height: 36,
          },
          large: {
            url: "https://dl.airtable.com/.attachmentThumbnails/f2f8852b074751d01be416591f0d7d35/ae5386e2?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=b449466f8a9fb03d",
            width: 768,
            height: 512,
          },
          full: {
            url: "https://dl.airtable.com/.attachmentThumbnails/6dc6c926b86b5232fa14af5f76d8be02/c305b118?ts=1660337479&userId=usrQMwWEPx18KgLcP&cs=7a4709e4fc869e6e",
            width: 3000,
            height: 3000,
          },
        },
      },
    ],
    reviews: 100,
    stars: 3.6,
    name: "entertainment center",
    description:
      "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    company: "caressa",
  },
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({type: SIDEBAR_OPEN});
  };
  const closeSidebar = () => {
    dispatch({type: SIDEBAR_CLOSE});
  };
  const fetchProducts = async (url) => {
    dispatch({type: GET_PRODUCTS_BEGIN});
    try {
      const responce = await axios.get(url);
      const products = responce.data;
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: products});
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR});
    }
  };
  const fetchSingleProduct = async (url) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN});
    try {
      const responce = await axios.get(url);
      const singleProduct = responce.data;
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct});
    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR});
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  const value = {
    ...state,
    openSidebar,
    closeSidebar,
    fetchSingleProduct,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
