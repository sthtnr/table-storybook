import React, { useState, useEffect, useMemo } from 'react'
import Table from './Table'
import Allele from './Allele'
import RNAi from './RNAi'
import Entity from './Entity'
import Overexpression from './Overexpression'
import loadData from '../../../../services/loadData'

const Phenotype = ({ WBid, tableType }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    loadData(WBid, tableType, true).then((json) => setData(json.data))
  }, [WBid, tableType])

  const showEntities = (value) => {
    if (value === null) {
      return 'N/A'
    } else {
      return <Entity eObj={value} />
    }
  }

  const showEvidence = (value) => {
    if (value.Allele) {
      return <Allele aObj={value.Allele} />
    }
    if (value.RNAi) {
      return <RNAi rObj={value.RNAi} />
    } else {
      console.error('hogehoge!!')
      return null
    }
    // rest-stagingの"Overexpression"用APIは今のところありません
    // else {
    //   return <Overexpression values={value} />
    // }
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Phenotype',
        accessor: 'phenotype.label',
      },
      {
        Header: 'Entities Affected',
        accessor: 'entity',
        Cell: ({ cell: { value } }) => showEntities(value),
        disableFilters: true,
        sortType: 'sortByEntity',
      },
      {
        Header: 'Supporting Evidence',
        accessor: 'evidence',
        Cell: ({ cell: { value } }) => showEvidence(value),
        disableSortBy: true,
        filter: 'evidenceFilter',
        minWidth: 240,
        width: 540,
      },
    ],
    []
  )

  return (
    <>
      <Table columns={columns} data={data} tableType={tableType} />
    </>
  )
}

export default Phenotype
