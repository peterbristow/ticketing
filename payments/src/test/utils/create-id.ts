import mongoose from 'mongoose';

const CreateId = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  return id;
};

export default CreateId;
