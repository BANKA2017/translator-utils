const cryptoHandle = crypto || {
    getRandomValues: () => [0],
    randomUUID: () => '00000000-0000-0000-0000-000000000000'
}
export default cryptoHandle
