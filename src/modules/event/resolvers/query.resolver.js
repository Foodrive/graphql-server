const getAllFoodEvents = () => 
  // TODO query database
   []
;

const getAllRequestEvents = async(_0,_1,context) => {
  // TODO query database
  // need to create DTO mappers from db to objects 
  const data = await context.database.events.getAll();
  // need to create DTO mappers from db to objects 
  return data.map(item => ({
    "creator": item.doc.creator,
    "location": item.doc.location,
    "allergies": item.doc.allergies
  }));
};

const getFoodEvent = () => {
  // TODO query database
};

const getRequestEvent = () => {
  // TODO query database
};

const Query = {
  getAllFoodEvents,
  getAllRequestEvents,
  getFoodEvent,
  getRequestEvent,
};

export default {
  Query,
};
