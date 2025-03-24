import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, message } from "../components/ui/app-lib-components";
import { Layout, Tree, Spin } from "antd";
import { updateProduct } from "../store/slices/productSlice";
import { ArrowLeftOutlined } from "@ant-design/icons";

import Button from "../components/ui/app-button-component";
import Form from "../components/ui/app-form-component";
import Input from "../components/ui/app-input-component";
import { Category } from "../types/types";
import { AppDispatch } from "../store";

const { Sider } = Layout;

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const products = useSelector((state: any) => state.product.products || []);
  const product =
    products.length > 0
      ? products.find((p: any) => Number(p.id) === Number(id))
      : null;

  const { categories, loading: categoryLoading } = useSelector(
    (state: any) => state.category
  );

  const [editableAttributes, setEditableAttributes] = useState<any[]>([]);
  const [newAttribute, setNewAttribute] = useState<{
    code: string;
    value: string;
  }>({
    code: "",
    value: "",
  });

  const renderTreeData = (
    categories: Category[] = [],
    parentId: string | null = null
  ): any[] => {


    return categories
      .filter((category) => String(category.parent_id) === String(parentId)) // Ensure type consistency
      .map((category) => ({
        title: category.name,
        key: category.id,
        children: renderTreeData(categories, String(category.id)), // Pass ID as string
      }));
  };

  const handleEditAttributes = () => {
    setEditableAttributes(product?.attributes || []);
  };

  const handleSaveAttributes = async (values: any) => {
    try {
      const updatedProduct = {
        ...product,
        attributes: values.attributes,
      };

      // Dispatch the update product action
      dispatch(updateProduct(updatedProduct));

      // Show a success message
      message.success("Product attributes updated successfully");

      // Exit edit mode (set editableAttributes to empty)
      setEditableAttributes([]);
    } catch (error) {
      message.error("Failed to update product attributes");
    }
  };

  const handleAddAttribute = () => {
    if (newAttribute.code && newAttribute.value) {
      const updatedProduct = {
        ...product,
        attributes: [...product?.attributes, newAttribute],
      };

      // Dispatch the update product action with new attribute added
      dispatch(updateProduct(updatedProduct));

      // Reset the new attribute form
      setNewAttribute({ code: "", value: "" });

      message.success("New attribute added successfully");
    } else {
      message.error("Both code and value are required for the new attribute");
    }
  };

  if (!product) {
    return <h3>Product not found</h3>;
  }

  return (
    <>
      <Layout style={{ minHeight: "100vh", marginRight: 150 }}>
        <Sider width={250} theme="light">
          {categoryLoading ? (
            <Spin tip="Loading categories..." />
          ) : (
            <Tree showLine treeData={renderTreeData(categories)} />
          )}
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Card
            title={
              <>
                <Button
                  type="link"
                  size="small"
                  onClick={() => navigate(-1)} // Navigate back
                  style={{ padding: 0, marginBottom: 8 }}
                >
                  <ArrowLeftOutlined style={{ fontSize: 16 }} />{" "}
                  {/* Back Icon */}
                </Button>
                {product.name}
              </>
            }
            style={{ width: "auto", margin: "auto" }}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <img
                  alt={product.name}
                  src={product.image_url || "placeholder.jpg"}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Col>
              <Col span={16}>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>

                {/* Display existing attributes */}
                {/* Display existing attributes */}
                <div>
                  <strong>Attributes:</strong>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {product.attributes.map((attr: any) => (
                      <li
                        key={attr.code}
                        style={{
                          display: "flex",

                          marginBottom: "8px",
                        }}
                      >
                        <strong
                          style={{ minWidth: "120px", textAlign: "left" }}
                        >
                          {attr.code}:
                        </strong>
                        <span>{attr.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button to enable attribute editing */}
                {/* Button to enable attribute editing */}
                {editableAttributes.length === 0 && (
                  <Button onClick={handleEditAttributes}>
                    Edit Attributes
                  </Button>
                )}

                {/* Editable Attributes Section */}
                {/* Editable Attributes Section */}
                {/* Editable Attributes Section */}
                {editableAttributes.length > 0 && (
                  <Form
                    initialValues={{
                      attributes: editableAttributes,
                    }}
                    onFinish={handleSaveAttributes}
                  >
                    {editableAttributes.map((attr: any, index: number) => (
                      <Form.Item key={index}>
                        <Row gutter={16} align="middle">
                          {/* Code (Editable) Column */}
                          <Col span={6}>
                            <Form.Item
                              name={["attributes", index, "code"]}
                              noStyle
                              rules={[
                                { required: true, message: "Code is required" },
                              ]}
                            >
                              <Input
                                defaultValue={attr.code}
                                placeholder="Enter Code"
                              />
                            </Form.Item>
                          </Col>

                          {/* Input Field Column */}
                          <Col span={12}>
                            <Form.Item
                              name={["attributes", index, "value"]}
                              noStyle
                              rules={[
                                {
                                  required: true,
                                  message: "Value is required",
                                },
                              ]}
                            >
                              <Input
                                defaultValue={attr.value}
                                placeholder="Enter Value"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Save Attributes
                      </Button>
                    </Form.Item>
                  </Form>
                )}

                {/* Add New Attribute Section */}
                <div style={{ marginTop: 20 }}>
                  <strong>Add New Attribute:</strong>
                  <Form
                    layout="inline"
                    style={{ marginTop: 10 }}
                    onFinish={handleAddAttribute}
                  >
                    <Form.Item
                      label="Code"
                      rules={[
                        { required: true, message: "Please enter the code" },
                      ]}
                    >
                      <Input
                        value={newAttribute.code}
                        onChange={(e) =>
                          setNewAttribute({
                            ...newAttribute,
                            code: e.target.value,
                          })
                        }
                        placeholder="Enter attribute code"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Value"
                      rules={[
                        { required: true, message: "Please enter the value" },
                      ]}
                    >
                      <Input
                        value={newAttribute.value}
                        onChange={(e) =>
                          setNewAttribute({
                            ...newAttribute,
                            value: e.target.value,
                          })
                        }
                        placeholder="Enter attribute value"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add Attribute
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </Card>
        </Layout>
      </Layout>
    </>
  );
};

export default ProductDetails;
