import { useEffect, useState } from "react";
import { useUserLayout } from "../../context/user-layout.context"
import { Avatar, List } from "antd";
import type { ILoggedInUserProfile } from "../../context/auth.context";




const ChatPage = () => {
  const [userList] = useState<Array<ILoggedInUserProfile>>([
        {
            "_id": "683d8089001153200af0bf91",
            "name": "trk123",
            "email": "khojwartikaram+abc@gmail.com",
            "role": "customer",
            "status": "inactive",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {
                "secureUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/v1748861064/api-42/user/qvns9jf4av98dzrf1vvd.png",
                "publicId": "api-42/user/qvns9jf4av98dzrf1vvd",
                "optimizedUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/c_scale,w_500/f_auto,q_auto/v1/api-42/user/qvns9jf4av98dzrf1vvd?_a=BAMClqXy0"
            },
            "createdBy": null,
            "updatedBy": "68300d57c51596322ac9dd91",
            "createdAt": "2025-06-02T10:44:25.791Z",
            "updatedAt": "2025-09-26T16:41:52.239Z",
            "deletedAt": null
        },
        {
            "_id": "68301040eb4e75cdfe5e65ab",
            "name": "customer user",
            "email": "khojwartikaram+customer@gmail.com",
            "role": "customer",
            "status": "ACTIVE",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {
                "secureUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/v1747980350/api-42/user/tko2fu8xuq3mhrznkfwy.jpg",
                "publicId": "api-42/user/tko2fu8xuq3mhrznkfwy",
                "optimizedUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/c_scale,w_500/f_auto,q_auto/v1/api-42/user/tko2fu8xuq3mhrznkfwy?_a=BAMClqXy0"
            },
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-05-23T06:05:52.350Z",
            "updatedAt": "2025-05-23T08:29:30.910Z",
            "deletedAt": null
        },
        {
            "_id": "683d784a6cb952d471574792",
            "name": "activated customer user1",
            "email": "khojwartikaram+activated1@gmail.com",
            "role": "customer",
            "status": "inactive",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {
                "secureUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/v1748858953/api-42/user/qjgfsi7uagqmdk0sxjsm.png",
                "publicId": "api-42/user/qjgfsi7uagqmdk0sxjsm",
                "optimizedUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/c_scale,w_500/f_auto,q_auto/v1/api-42/user/qjgfsi7uagqmdk0sxjsm?_a=BAMClqXy0"
            },
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-06-02T10:09:14.356Z",
            "updatedAt": "2025-06-02T10:09:14.356Z",
            "deletedAt": null
        },
        {
            "_id": "68cbc807f54b68b7920df285",
            "name": "abc3211",
            "email": "khojwartikaram+abc3211@gmail.com",
            "role": "customer",
            "status": "ACTIVE",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {},
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-09-18T08:51:19.048Z",
            "updatedAt": "2025-09-18T08:52:10.728Z",
            "deletedAt": null
        },
        {
            "_id": "68cbc54cf54b68b7920df27e",
            "name": "abc321000",
            "email": "khojwartikaram+abc321000@gmail.com",
            "role": "customer",
            "status": "ACTIVE",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {},
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-09-18T08:39:40.931Z",
            "updatedAt": "2025-09-18T08:40:44.946Z",
            "deletedAt": null
        },
        {
            "_id": "68cbbf35f54b68b7920df275",
            "name": "abc32100",
            "email": "khojwartikaram+abc32100@gmail.com",
            "role": "customer",
            "status": "ACTIVE",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {},
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-09-18T08:13:41.746Z",
            "updatedAt": "2025-09-18T08:15:12.041Z",
            "deletedAt": null
        },
        {
            "_id": "68861dcf79ad5c37292a0822",
            "name": "abc3210",
            "email": "khojwartikaram+customers@gmail.com",
            "role": "customer",
            "status": "ACTIVE",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {
                "secureUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/v1753619919/api-42/user/kqgd6inarsuwvdpe5cop.png",
                "publicId": "api-42/user/kqgd6inarsuwvdpe5cop",
                "optimizedUrl": "https://res.cloudinary.com/dmr8kzy5n/image/upload/c_scale,w_500/f_auto,q_auto/v1/api-42/user/kqgd6inarsuwvdpe5cop?_a=BAMAK+Xy0"
            },
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-07-27T12:38:39.944Z",
            "updatedAt": "2025-07-27T12:41:02.903Z",
            "deletedAt": null
        },
        {
            "_id": "684c7adcbf43c63100225950",
            "name": "abc3210",
            "email": "khojwartikaram+abc3210@gmail.com",
            "role": "customer",
            "status": "inactive",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {},
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-06-13T19:24:12.575Z",
            "updatedAt": "2025-06-13T19:24:12.575Z",
            "deletedAt": null
        },
        {
            "_id": "684c7a605d68e9380e59fa85",
            "name": "abc321",
            "email": "khojwartikaram+abc321@gmail.com",
            "role": "customer",
            "status": "inactive",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {},
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-06-13T19:22:08.011Z",
            "updatedAt": "2025-06-13T19:22:08.011Z",
            "deletedAt": null
        },
        {
            "_id": "684c79dcc3a11afe0217bc30",
            "name": "abc123",
            "email": "khojwartikaram+abc123@gmail.com",
            "role": "customer",
            "status": "inactive",
            "address": {
                "billingAddress": "KTM",
                "shippingAddress": "KTM"
            },
            "phone": "9876163083",
            "gender": "male",
            "dob": "2001-01-01T00:00:00.000Z",
            "image": {},
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2025-06-13T19:19:56.275Z",
            "updatedAt": "2025-06-13T19:19:56.275Z",
            "deletedAt": null
        }
    ])

  const {setCollapsed} = useUserLayout();

  useEffect(() => {
    setCollapsed(true);
  }, [])

  return (
    <div className="flex w-full h-full">
      <div className="flex w-3/11 flex-col gap-5 h-full">
        <div className="flex w-full items-center justify-center h-20 border-b border-b-stone-800/15">
          <h1 className="text-2xl text-teal-800 font-bold ">Your Chat List</h1>
        </div>

        <List
          className="px-5! overflow-y-scroll bg-gray-200"
          dataSource={userList}
          renderItem={(user: ILoggedInUserProfile) => (
            <List.Item 
              key={user._id}
              className="shadow-lg hover:bg-teal-50 hover:cursor-pointer rounded-md"
            >
              <List.Item.Meta
                className="px-2"
                avatar={
                <Avatar 
                  src={user.image.optimizedUrl}
                  className="size-10!" 
                />
              }
                title={<h3 className="font-semibold text-md">{user.name}</h3>}
                description={
                  <div>
                    <p className="turncate pe-3 font-light text-black/75 overflow-x-hidden">{user.email}</p>
                    <span className="text-sm italic font-light">{user.role}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />

      </div>
    </div>
  )
}

export default ChatPage