const loadData = async (WBid, tableType, alpha) => {
  const proxyUrl = 'https://calm-reaches-60051.herokuapp.com/'
  const targetUrl =
    alpha && tableType === 'phenotype'
      ? `http://rest-staging.wormbase.org/rest/field/gene/${WBid}/${tableType}_flat`
      : `http://rest.wormbase.org/rest/field/gene/${WBid}/${tableType}`
  const res = await fetch(proxyUrl + targetUrl)
  const json = await res.json()
  const jsonSpecific =
    alpha && tableType === 'phenotype'
      ? await json[`${tableType}_flat`]
      : await json[`${tableType}`]
  return jsonSpecific
}

export default loadData
