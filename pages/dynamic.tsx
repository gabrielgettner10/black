import { GetServerSideProps, NextPage } from "next"
import { ReactNode, useEffect, useState } from "react"
import { Col, Container, Row } from "reactstrap"

type ApiResponse = {
  name: string
  timestamp: string // Modifiquei para string aqui, pois é assim que ele vem do JSON
}

export const getServerSideProps: GetServerSideProps = async () => {
  const serverSideData: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json())

  return {
    props: {
      serverSideData
    }
  }
}

const Dynamic: NextPage = (props: {
  children?: ReactNode
  serverSideData?: ApiResponse
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch("/api/hello").then(res => res.json())
    setClientSideData(data)
  }

  const serverTimestamp = props.serverSideData ? new Date(props.serverSideData.timestamp) : null
  const clientTimestamp = clientSideData ? new Date(clientSideData.timestamp) : null

  return (
    <Container tag="main">
      <h1 className="my-5">
        Como funcionam as renderizações do Next.js
      </h1>

      <Row>
        <Col>
          <h3>
            Gerado no servidor: 
          </h3>
          <h2>
            {serverTimestamp?.toString()}
          </h2>
        </Col>

        <Col>
          <h3>
            Gerado no cliente: 
          </h3>
          <h2>
            {clientTimestamp?.toString()}
          </h2>
        </Col>
      </Row>
    </Container>
  )
}

export default Dynamic
