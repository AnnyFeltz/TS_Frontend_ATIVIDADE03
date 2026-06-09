import { api } from './api';

export async function listarUsuarios() {
  const { data } = await api.get('/usuarios');
  return data;
}

export async function criarUsuario(payload) {
  const { data } = await api.post('/usuarios/criar', payload);
  return data;
}

export async function atualizarUsuario(id, payload) {
  const { data } = await api.patch(`/usuarios/atualizar/${id}`, payload);
  return data;
}

export async function deletarUsuario(id) {
  await api.delete(`/usuarios/deletar/${id}`);
}
