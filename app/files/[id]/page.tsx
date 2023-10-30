'use client'

import React from 'react'

const DetailPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id)

  return <div>DetailPage</div>
}

export default DetailPage
