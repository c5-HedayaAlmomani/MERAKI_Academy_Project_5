// import axios from "axios";
// import { useState, useEffect } from "react";
// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const gitAllProduct = () => {
//     axios
//       .get(`http://localhost:5000/products/pagination/${page}`)
//       .then((result) => {
//         console.log(result.data.result);
//         setProducts(result.data.result);
//       })
//       .catch((err) => {
//         console.log({ err });
//       });
//   };

//   useEffect(gitAllProduct, [page]);

//   return (
//     <div>
//       {products.length &&
//         products.map((e, i) => {
//           return (
//             <div key={i}>
//               <img src={`${e.image}`} />

//               <h1>{e.title}</h1>
//             </div>
//           );
//         })}

//       {page != 1 ? (
//         <>
//           <button
//             onClick={() => {
//               setPage(page - 1);
//               gitAllProduct();
//               console.log(page);
//             }}
//           >
//             back
//           </button>
//         </>
//       ) : (
//         <></>
//       )}
//       {page != 3 ? (
//         <>
//           <button
//             onClick={() => {
//               setPage(page + 1);
//               gitAllProduct();
//               console.log(page);
//             }}
//           >
//             next
//           </button>
//         </>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };
// export default Product;
