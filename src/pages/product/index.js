import React, { useEffect, useState } from 'react';
import auth from '../../services/auth';

const Product = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    auth.product()
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      setProducts(res.data);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  const RenderProduct = () => {
    if (products === null) return null;
    const data = products.map((val) => {
      const varian = val.variants.map((variant) => {
        const image = variant.images.map((imgs) => {
          return (
            <div>
              <img src={imgs.small_url} alt={imgs.id} />
              <p>{imgs.attachment_updated_at}</p>
            </div>
          );
        });
        return (
          <div>
            {image}
          </div>
        );
      });
      return (
        <div>
          {varian}
          <p>{val.name}</p>
          <p>{val.description}</p>
          <p>{val.display_normal_price}</p>
        </div>
      );
    });
    return (
      <div>
        {data}
      </div>
      );
  };
  return (
    <div className="container">
      <h1>Product</h1>
      <hr />
      {
        isLoading ?
          <p>loading</p> : (
            <div>
              <RenderProduct />
            </div>
        )
      }
    </div>
  );
};

export default Product;
