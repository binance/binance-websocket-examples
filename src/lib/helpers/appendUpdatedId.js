const appendUpdatedId = (updateId, ask, bid) => {
  const insertUpdateId = (order) => {
    order[2] = updateId;
    return order;
  };
  return [ask, bid].map((side) => side.map(insertUpdateId));
};

export default appendUpdatedId;
