import React, { useEffect, useState } from "react";
import {
  Layout,
  Tree,
  Pagination,
  Row,
  Col,
  Card,
  Select,
  Checkbox,
  AntRow,
  AntCol,
} from "../components/ui/app-lib-components";
import Spin from "../components/ui/app-spin-component";

import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/slices/categorySlice";
import { getProducts } from "../store/slices/productSlice";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DEFAULT_i18_NAMESPACE } from "../constant/constant";
import { Category } from "../types/types";
import LastModifiedProduct from "../components/widgets/LastModifiedProduct";
const { Sider, Content } = Layout;
const { Option } = Select;

const Dashboard = () => {
  const { t } = useTranslation(DEFAULT_i18_NAMESPACE, {
    keyPrefix: "Dashboard",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories, loading: categoryLoading } = useSelector(
    (state: any) => state.category
  );
  const {
    products,
    loading: productLoading,
    totalProducts,
  } = useSelector((state: any) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [categoryId, setCategoryId] = useState<any | undefined>(undefined);
  const [sortBy, setSortBy] = useState<any>("id");
  const [isDesc, setIsDesc] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCategories());
    if (categoryId !== undefined) {
      dispatch(
        getProducts({
          categoryId,
          page: currentPage,
          limit: pageSize,
          sortBy,
          isDesc,
        })
      );
    } else {
      dispatch(
        getProducts({
          categoryId: undefined,
          page: currentPage,
          limit: pageSize,
          sortBy,
          isDesc,
        })
      );
    }
  }, [dispatch, categoryId, currentPage, pageSize, sortBy, isDesc]);

  const handleCardClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const renderTreeData = (
    categories: Category[] = [],
    parentId: string | null = null
  ): any[] => {
    return categories
      .filter((category) => String(category.parent_id) === String(parentId))
      .map((category) => ({
        title: category.name,
        key: category.id,
        children: renderTreeData(categories, String(category.id)),
      }));
  };

  const handleSelectCategory = (selectedKeys: React.Key[]) => {
    const selectedCategoryId =
      selectedKeys.length > 0 ? Number(selectedKeys[0]) : undefined;
    setCategoryId(selectedCategoryId);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleDescCheckboxChange = (e: any) => {
    setIsDesc(e.target.checked);
  };

  const getColSpan = (pageSize: number) => {
    if (pageSize === 5) return 24;
    if (pageSize === 10) return 12;
    if (pageSize === 20) return 6;
    return 6;
  };

  return (
    <Layout style={{ minHeight: "100vh", marginRight: 150 }}>
      <Sider width={250} theme="light">
        {categoryLoading ? (
          <Spin tip="Loading categories..." />
        ) : (
          <Tree
            showLine
            onSelect={handleSelectCategory}
            treeData={renderTreeData(categories)}
            defaultExpandAll
          />
        )}
      </Sider>

      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <LastModifiedProduct />
          {productLoading ? (
            <Spin tip="Loading products..." />
          ) : (
            <div>
              {products && products.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {products.map((product: any) => (
                    <Col key={product.id} span={getColSpan(pageSize)}>
                      <Card
                        hoverable
                        onClick={() => handleCardClick(product.id)}
                      >
                        <Row gutter={16}>
                          <Col flex="none">
                            <img
                              alt={product.name}
                              src={product.image_url || "placeholder.jpg"}
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          </Col>
                          <Col flex="auto">
                            <Card.Meta
                              title={product.name}
                              description={
                                <>
                                  <p>{product.description}</p>
                                  <p>{`$${product.price}`}</p>
                                  {product.attributes &&
                                    product.attributes.length > 0 && (
                                      <div>
                                        <strong>{t("Attributes")}</strong>
                                        <ul
                                          style={{
                                            paddingLeft: "16px",
                                            margin: 0,
                                          }}
                                        >
                                          {product.attributes.map(
                                            (attr: any) => (
                                              <li key={attr.code}>
                                                <strong>{attr.code}:</strong>{" "}
                                                {attr.value}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                </>
                              }
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <h3>{t("NoProductFound")}</h3>
              )}
              <div style={{ marginTop: "24px" }}>
                <AntRow justify="space-between" align="middle">
                  <AntCol>
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalProducts}
                      onChange={handlePageChange}
                      showSizeChanger
                      pageSizeOptions={["5", "10", "20", "50"]}
                    />
                  </AntCol>
                  <AntCol>
                    <Select
                      value={sortBy}
                      onChange={handleSortByChange}
                      style={{ width: 120, marginRight: 16 }}
                    >
                      <Option value="id">Id</Option>
                      <Option value="name">{t("name")}</Option>
                    </Select>
                    <Checkbox
                      checked={isDesc}
                      onChange={handleDescCheckboxChange}
                    >
                      DESC
                    </Checkbox>
                  </AntCol>
                </AntRow>
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
