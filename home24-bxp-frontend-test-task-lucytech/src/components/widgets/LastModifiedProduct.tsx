import { useEffect } from "react";
import "./LastModifiedProduct.css";
import { getLastModifiedProduct } from "../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";
import { DEFAULT_i18_NAMESPACE } from "../../constant/constant";

const LastModifiedProduct = () => {
  const { t } = useTranslation(DEFAULT_i18_NAMESPACE, {
    keyPrefix: "LastModifiedCustomWidets",
  });
  const dispatch = useDispatch<AppDispatch>();

  const { last_modified, loading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(getLastModifiedProduct());
  }, [dispatch]);

  if (loading) return <div className="widget">Loading...</div>;

  if (!last_modified) {
    return <div className="widget">{t("No products found")}</div>;
  }

  const product = Array.isArray(last_modified)
    ? last_modified[0]
    : last_modified;

  return (
    <div className="widget">
      <h3>{t("Last Modified Product")}</h3>
      <div className="product-info">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}

        <h4>{product.name}</h4>
        <p>ID: {product.id}</p>
        <p>
          {t("Price")}: ${product.price}
        </p>
        <p>
          {t("Last Modified")}:{" "}
          {new Date(product.last_modified).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default LastModifiedProduct;
