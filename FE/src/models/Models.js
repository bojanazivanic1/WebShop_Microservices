export class GetUserModel {
    constructor(id, username, email, name, lastName, birth, address, userKind, image) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.name = name;
      this.lastName = lastName;
      this.birth = birth;
      this.address = address;
      this.userKind = userKind;
      this.image = image;
    }
};

export class GetOrderModel {
  constructor(id, deliveryAddress, comment, orderTime, deliveryTime, orderStatus, orderItems) {
    this.id = id;
    this.deliveryAddress = deliveryAddress;
    this.comment = comment;
    this.orderTime = orderTime;
    this.deliveryTime = deliveryTime;
    this.orderStatus = orderStatus;
    this.orderItems = orderItems;
  }
};

export class GetProductModel {
  constructor(id, name, price, amount, description, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.description = description;
    this.image = image;
  }
};
