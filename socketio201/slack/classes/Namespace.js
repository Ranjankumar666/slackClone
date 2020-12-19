class Namespace{
  constructor(id, title, img, endpoint){
      this.id = id;
      this.endpoint = endpoint;
      this.title = title;
      this.img = img;
      this.rooms = [];
  }

  addRoom(roomObj){
    this.rooms.push(roomObj);
  }

}

module.exports = Namespace;
