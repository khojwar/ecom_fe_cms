import { Card, Descriptions, Divider, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import orderSvc from "../../services/order.service";
import { toast } from "sonner";
import type { Iorder, IBuyer } from "./OrderListingPage";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const OrderViewPage = () => {
  const { id } = useParams();
  console.log("orderCode",id);
  
  
  const navigate = useNavigate();
  const [order, setOrder] = useState<Iorder | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await orderSvc.getRequest(`/order/${id}`);
      if (response?.data) {
        setOrder(response.data);
      }
    } catch (error) {
      toast.error("Failed to load order details.", {
        description: "Please try again later or contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (!order) return <p className="text-center text-red-600 mt-10">Order not found.</p>;

  const buyer: IBuyer = order.buyer;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeftOutlined
          className="cursor-pointer text-teal-700 hover:text-teal-900 text-lg"
          onClick={() => navigate(-1)}
        />
        <Title level={3} className="!mb-0 text-teal-900">
          Order Details
        </Title>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE — Order Info */}
        <div className="flex-1 space-y-6">
          <Card
            title={<span className="text-teal-800 font-semibold">Order Summary</span>}
            bordered={false}
            className="shadow-md rounded-2xl"
          >
            <Descriptions
              column={1}
              labelStyle={{ fontWeight: 600, color: "#0f766e" }}
              contentStyle={{ color: "#374151" }}
            >
              <Descriptions.Item label="Order Code">{order.code}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    order.status === "pending"
                      ? "orange"
                      : order.status === "confirmed"
                      ? "blue"
                      : order.status === "delivered"
                      ? "green"
                      : order.status === "cancelled"
                      ? "red"
                      : "default"
                  }
                >
                  {order.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Paid">
                {order.isPaid ? (
                  <Tag color="green">Paid</Tag>
                ) : (
                  <Tag color="red">Unpaid</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                <Text strong>Rs. {(order.total as number).toLocaleString()}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Subtotal">
                Rs. {(order.subTotal as number).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Tax">Rs. {(order.tax as number).toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Discount">
                Rs. {(order.discount as number).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Charge">
                Rs. {(order.deliveryCharge as number).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Service Charge">
                Rs. {(order.serviceCharge as number).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(order.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                {new Date(order.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title={<span className="text-teal-800 font-semibold">Buyer Information</span>}
            bordered={false}
            className="shadow-md rounded-2xl"
          >
            <Descriptions
              column={1}
              labelStyle={{ fontWeight: 600, color: "#0f766e" }}
              contentStyle={{ color: "#374151" }}
            >
              <Descriptions.Item label="Name">{buyer.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{buyer.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{buyer.phone}</Descriptions.Item>
              <Descriptions.Item label="Billing Address">
                {buyer.address?.billingAddress || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Shipping Address">
                {buyer.address?.shippingAddress || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                <Tag color={buyer.role === "admin" ? "purple" : buyer.role === "seller" ? "blue" : "green"}>
                  {buyer.role.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={buyer.status === "active" ? "green" : "volcano"}>
                  {buyer.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        {/* RIGHT SIDE — Buyer Image */}
        <div className="flex flex-col items-center justify-start lg:w-1/3">
          <Card
            bordered={false}
            className="shadow-md rounded-2xl w-full flex flex-col items-center text-center"
          >
            <img
              src={`${buyer.image?.optimizedUrl || buyer.image?.secureUrl}?t=${Date.now()}`}
              alt={buyer.name}
              className="rounded-2xl w-60 h-60 object-cover border-4 border-teal-700 shadow-md"
            />
            <Divider />
            <Title level={4} className="!mb-0 text-teal-800">
              {buyer.name}
            </Title>
            <Text type="secondary">{buyer.email}</Text>
            <Text className="block mt-2">{buyer.phone}</Text>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderViewPage;
