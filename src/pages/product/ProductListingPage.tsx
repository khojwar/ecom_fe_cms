import React from "react";
// import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table, Tag, type TableProps } from "antd";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { productSvc } from "../../services/product.service";
import { toast } from "sonner";
import { paginationDefault } from "../../config/constants";


// Attribute key-value pair
interface Attribute {
  key: string;
  value: string[]; // instead of [] (which means "any[]")
  id: string;
}

// Seller / User type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  image: string;
}

// Category type
interface Category {
  _id: string;
  name: string;
  status: string;
  slug: string;
  parentId: string;
  createdBy: string;
}

// ---------- Main Product Interface ----------

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  discount: string;
  afterDiscount: string;
  tag: string[];             // better than []
  stock: string;
  attributes: Attribute[];
  sku: string;
  homeFeature: string;
  status: string;
  seller: User;
  category: Category[];
  brand: string;
  images: (string | null)[]; // array of image URLs or null
  createdBy: User;
  updatedBy: string;
}

export interface getProductListProps {
  page?: number; 
  limit?: number; 
  search?: string | null
}


const ExpandableText: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > 20;
  const displayText = expanded || !shouldTruncate ? text : text.substring(0, 20) + '...';
  return (
    <div>
      {displayText}
      {shouldTruncate && (
        <a onClick={() => setExpanded(!expanded)} style={{ color: '#1890ff', cursor: 'pointer', marginLeft: 8 }}>
          {expanded ? 'Show Less' : 'Show More'}
        </a>
      )}
    </div>
  );
};



const ProductListingPage = () => {
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<IProduct[]>([]);
    const [pagination, setPagination] = useState({ current: paginationDefault.page, pageSize: paginationDefault.limit, total: paginationDefault.total });
    const [loading, setLoading] = useState<boolean>(false);

    // const navigate = useNavigate();

    const onDeleteConfirm = async (productId: string) => {
          setLoading(true);
           try {
            const response = await productSvc.deleteRequest(`/product/${productId}`);
            if(response?.data) {
                toast.success('Product deleted successfully!', {
                  description: "The product has been removed from the listing.",
                });
                // Refresh the product list after deletion
                getProductList({ page: pagination.current, limit: pagination.pageSize, search: search ?? null });
            }


           } catch (exception) {
              toast.error('Failed to delete the product. Please try again.', {
                description: "If the problem persists, contact support.",
              });
           } finally {
            setLoading(false);
           }


        };

    const columns: TableProps<IProduct>['columns'] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <ExpandableText text={text} />,
      },
      {
        title: 'Images',
        key: 'images',
        dataIndex: 'images',
        render: (images: (string | null)[]) => (
          <>
            {images && images.length > 0 ? (    
                images.map((img, index) => (
                    img ? <img key={index} src={img} alt={`Product Image ${index + 1}`} style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 8 }} /> : <span key={index} style={{ display: 'inline-block', width: 50, height: 50, lineHeight: '50px', textAlign: 'center', backgroundColor: '#f0f0f0', color: '#999', marginRight: 8 }}>N/A</span>
                ))
            ) : (
                <span style={{ display: 'inline-block', width: 50, height: 50, lineHeight: '50px', textAlign: 'center', backgroundColor: '#f0f0f0', color: '#999' }}>N/A</span>
            )}
            </> 
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text: string) => <ExpandableText text={text} />,
      },
      {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'slug',
        render: (text: string) => <ExpandableText text={text} />,
      },
      {
        title: 'Price',
        key: 'price',
        dataIndex: 'price',
        render: (price: string) => ( `NPR ${ (parseInt(price) / 100).toFixed(2) }`  ),
      },
      {
        title: 'Discount ( % )',
        key: 'discount',
        dataIndex: 'discount',
      },
      {
        title: 'After Discount',
        key: 'afterDiscount',
        dataIndex: 'afterDiscount',
        render: (afterDiscount: string) => ( `NPR ${ (parseInt(afterDiscount) / 100).toFixed(2) }`  ),
      },
      {
        title: 'Tag',
        key: 'tag',
        dataIndex: 'tag'
      },
      {
        title: 'Stock',
        key: 'stock',
        dataIndex: 'stock',
      },
      {
        title: 'SKU',
        key: 'sku',
        dataIndex: 'sku',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (status: string) => (
          <span className={`px-4! py-2! rounded-full! ${status === 'active' ? 'bg-green-200! text-green-700!' : 'bg-red-200! text-red-700!'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ),
      },    
      {
        title: 'Seller',
        key: 'seller',
        dataIndex: ['seller', 'name'],
      },
      {
        title: 'Category',
        key: 'category',
        dataIndex: 'category', 
        render: (categories: Category[]) => (
          <>
            {categories && categories.length > 0 ? (
                categories.map((cat) => (
                    <Tag key={cat._id} className="px-4! py-2! rounded-full! shadow-2xl!" >{cat.name}</Tag>
                ))
            ) : (
                <span>N/A</span>
            )}
          </>
        ),
      },
      {
        title: 'Brand',
        key: 'brand',
        dataIndex: 'brand',
        render: (text: string) => text || 'N/A',  
      },
      {
        title: 'Created By',
        key: 'createdBy',
        dataIndex: ['createdBy', 'name'],
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: '_id',
        render: (val: string) => (
                  <div className="flex gap-4">
                    {/* <Button shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/admin/categories/${val}`)} className="bg-teal-700! text-white! p-5!" /> */}
                    <Space size="middle">
                        <Popconfirm
                          title="Are you sure?"
                          description="Once deleted, you will not be able to recover this product!"
                          onConfirm={() => {
                            onDeleteConfirm(val);
                          }}
                          okText="Confirm!"
                          showCancel={false}
                        >
                            <Button shape="circle" icon={<DeleteOutlined />}  className="bg-red-700! text-white! p-5!" />
                        </Popconfirm>
                    </Space>
                  </div>
                ),
      },
    ];

    const getProductList = async ({page = paginationDefault.page, limit = paginationDefault.limit, search = null}: getProductListProps): Promise<void>  => {
        setLoading(true);
        try {
            const response = await productSvc.getRequest('/product', { params: { page, limit, ...(search && { search }) } });
            console.log(response.data);

            if(response?.data) {
                setData(response.data);
            }

            if (response?.options) {
                setPagination({
                    current: response?.options?.pagination?.current,
                    pageSize: response?.options?.pagination?.limit,
                    total: response?.options?.pagination?.total,
                });
            }
        } catch (exception) {
            toast.error('Failed to fetch product list. Please try again.', {
              description: "If the problem persists, contact support.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductList({ page: paginationDefault.page, limit: paginationDefault.limit, search: search ?? null });
    }, []);

  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
                Product Listing
            </h1>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 my-2 sm:my-0">
                <Input.Search
                placeholder="Search"
                variant="filled"
                className="w-full sm:w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={ async (value) => { await getProductList({ page: 1, limit: pagination.pageSize, search: value }); setPagination(prev => ({ ...prev, current: 1 })); }}
                />
                {/* <Button
                icon={<PlusOutlined />}
                size="middle"
                className="bg-teal-900! text-white! hover:bg-teal-700! w-full sm:w-auto"
                onClick={() => navigate('/admin/products/create')}
                >
                Add Product
                </Button> */}
            </div>
        </div>


        <Table<IProduct> 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: true }} 
        pagination={{
                position: ["bottomCenter"],
                ...pagination,
                onChange: (page, pageSize) => {
                    getProductList({page: page, limit: pageSize, search: search ?? null});
                }
            }}
            loading={loading}
        />
    </div>
  )
}

export default ProductListingPage




