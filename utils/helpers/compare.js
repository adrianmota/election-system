exports.EqualValue = (value, EqualValue) => {
  return  value === EqualValue;
};

exports.idIsNull = (candidateId) => {
  return String(candidateId) == "null";
}