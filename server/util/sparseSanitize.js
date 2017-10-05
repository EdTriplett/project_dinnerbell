module.exports = (propsArray)=>newProps=>{
  const validProps = new Set(propsArray);
  return newProps.entries.reduce((acc, [key, value])=>{
    if (validProps.has(key)) {
      acc[key] = value;
    }
    return acc
  }, {});
}
