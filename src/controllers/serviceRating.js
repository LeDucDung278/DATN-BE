import ServiceRating from '../models/serviceRating';

// eslint-disable-next-line import/prefer-default-export
export const createServeRating = async (req, res) => {
  try {
    const serviceRating = await new ServiceRating(req.body).save();
    console.log(serviceRating);
    res.json(serviceRating);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const listServeRating = async (req, res) => {
  try {
    const serviceRating = await ServiceRating.find({}).exec();
    res.json(serviceRating);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const removeServeRating = async (req, res) => {
  try {
    const serviceRating = await ServiceRating.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(serviceRating);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateServeRating = async (req, res) => {
  const option = {
    new: true,
  };
  try {
    const serviceRating = await ServiceRating.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      option
    ).exec();
    res.json(serviceRating);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

export const readServeRating = async (req, res) => {
  try {
    const serviceRating = await ServiceRating.findOne({
      _id: req.params.id,
    }).exec();
    res.json(serviceRating);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllServiceRated = async (req, res) => {
  try {
    const { serviceId } = req.query;
    const data = await ServiceRating.find({ serviceId }).exec();
    const avgRated = (
      data.reduce((prev, item) => prev + item.rate, 0) / data.length
    ).toFixed(1);
    const ratedNumbers = [5, 4, 3, 2, 1];
    const detailRated = ratedNumbers.map((num) => ({
      star: num,
      count: data.filter((item) => Math.floor(item.rate) === num).length,
    }));
    res.json({
      total: data.length,
      list: data,
      avgRated,
      detailRated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getBestRatedServices = async (req, res) => {
  try {
    let serviceRating = await ServiceRating.find({}).populate('userId').exec();
    serviceRating = serviceRating.sort((a, b) => b.rate - a.rate);
    res.json(serviceRating.slice(0, 4));
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
