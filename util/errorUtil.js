const catchErrors = (err, res) => {
  return res.status(500).json({
    msg: 'Server error!',
    data: err.message,
    status: 'FAILED',
  });
};

export default catchErrors;
 