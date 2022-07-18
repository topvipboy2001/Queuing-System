type customerInfoType = {
  name: string;
  phoneNumber: string;
  email: string;
};

const customerInfo: customerInfoType[] = [
  {
    name: "Phạm Đình Phương Nam",
    phoneNumber: "0123456781",
    email: "phuongnam@gmail.com",
  },
  {
    name: "Nguyễn Văn Hiền",
    phoneNumber: "0123456789",
    email: "vanhienit@gmail.com",
  },
  {
    name: "Huỳnh Quốc Phong",
    phoneNumber: "0123456783",
    email: "quocphong@gmail.com",
  },
  {
    name: "Phan Thành Trung",
    phoneNumber: "0123456782",
    email: "thanhtrung@gmail.com",
  },
  {
    name: "Nguyễn Thành Long",
    phoneNumber: "0123458964",
    email: "longgnol123@gmail.com",
  },
  {
    name: "Nguyễn Thanh Tùng",
    phoneNumber: "0123456781",
    email: "tungdeptrai@gmail.com",
  }
];

export const randomCustomer = () => {
  const random = Math.floor(Math.random() * customerInfo.length);
  return customerInfo[random];
};
