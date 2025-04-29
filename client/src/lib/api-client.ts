import axios from 'axios'
import { prefix } from 'shared/apis'

export const apiClient = axios.create({
  baseURL: prefix,
  timeout: 1000 * 20,
})
