type AsyncRoutesMap = Record<string, () => Promise<unknown>>
type ExtraRoutesMap = Record<string, unknown>

const getAsyncRoutesMap = (): AsyncRoutesMap => {
  return {}
}

const getExtraRoutesMap = (): ExtraRoutesMap => {
  return {}
}

const register = () => {
  // Module lifecycle hook kept explicit for future page-ui runtime registration.
}

export default {
  name: 'page-ui',
  priority: 0,
  getAsyncRoutesMap,
  getExtraRoutesMap,
  register,
}
