import { GetServerSideProps } from "next"
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
// Will only be available on the server-side
console.log(serverRuntimeConfig.MY_SECRET)
// Will be available on both server-side and client-side
console.log(publicRuntimeConfig.API_ENDPOINT)

console.log(process.env.MY_STEP);

export interface GsspProps {

}

export default function Gssp({ }: GsspProps) {
  return <div>
    <h2>Demo for Environment variables and runtime configuration</h2>
    <pre>{process.env.MY_STEP}</pre>
  </div>
}

export const getServerSideProps: GetServerSideProps<GsspProps> = async ctx => {
  return { props: {} }
}