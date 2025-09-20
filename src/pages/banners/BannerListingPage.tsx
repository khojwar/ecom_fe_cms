import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Table} from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { toast } from 'sonner';
import { bannerSvc } from '../../services/banner.service';

export interface IBannerData {
            _id: string;
            title: string;
            url: string;
            status: string;
            image: string;
        }

const columns: TableProps<IBannerData>['columns'] = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Image',
    key: 'image',
    dataIndex: 'image',
    render: (text: string) => <img src={text} alt="banner" className='w-20 h-10 object-cover rounded' />,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: '_id',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.title}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

// const data: IBannerData[] = [
// {
//     _id: "cfba045c-4fda-49e7-af86-b684bc1c0ddf",
//     title: "banner one",
//     url: "https://google.com",
//     status: "active",
//     image: "https://res.cloudinary.com/dmr8kzy5n/image/upload/c_scale,w_500/f_auto,q_auto/v1/api-42/banner/pletjzz0zbcwfax076z5?_a=BAMClqXy0"
// },
// ];



const BannerListingPage = () => {

    const [data, setData] = useState<IBannerData[]>([]);


  const getBannerList = async () => {
      try {
        // console.log("Fetching banner list...");
        
        const response = await bannerSvc.getRequest("/banner");
        // console.log("Banner List:", response.data);
        setData(response.data);  
        
      } catch (exception) {
        // console.log(exception);
        
        toast.error("Failed to fetch banner list. Please try again." , {
          description: "An error occurred while retrieving the banner data."
        });
      }
    }


    useEffect(() => {
      getBannerList();
    }, [])

  return (
    <div>
        <div className='mb-4 text-teal-900 border-b-2 border-teal-900 pb-2'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                <h2 className='text-2xl font-bold  '>Banner Listing</h2>
                <div className='flex justify-center items-center gap-4'>
                    <div>
                        <Input.Search placeholder="searching..." size='large' />
                    </div>
                        <NavLink to="/admin/banners/create" className=" inline-block! bg-teal-900! text-white! px-4! py-2! rounded! hover:bg-teal-950! transition-all! duration-300!">
                        <PlusOutlined /> Add Banner
                        </NavLink>
                    </div>
                </div>
        </div>

        <Table<IBannerData> 
          columns={columns} 
          dataSource={data as Readonly<IBannerData[]>} 
          pagination={{ position: ['bottomCenter'] }} 
          rowKey={ (data: IBannerData) => {
            return data._id
          }} 
        />
    </div>
  )
}

export default BannerListingPage