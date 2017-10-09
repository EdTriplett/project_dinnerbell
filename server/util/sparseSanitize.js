module.exports = (propsArray)=>newProps=>{
  const validProps = new Set(propsArray);
  return Object.entries(newProps).reduce((acc, [key, value])=>{
    if (validProps.has(key)) {
      acc[key] = value;
    }
    return acc
  }, {});
}
