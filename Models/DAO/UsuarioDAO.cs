using Base.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Base.Models.DAO
{
    public class UsuarioDAO
    {
        string conexao = WebConfigurationManager.ConnectionStrings["projetoBase"].ConnectionString;

        public bool Login(string login, string senha)
        {
            bool logado = false;
            string consulta = "Select * FROM Usuarios where Upper(Login)=@login and Upper(Senha)=@senha ";

            using (var conn = new SqlConnection(conexao))
            {
                var cmd = new SqlCommand(consulta, conn);
                List<Usuario> dados = new List<Usuario>();
                Usuario p = null;
                cmd.Parameters.Add("@login", SqlDbType.VarChar).Value = login.ToUpper();
                cmd.Parameters.Add("@senha", SqlDbType.VarChar).Value = senha.ToUpper();
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                    {

                        while (reader.Read()) //Se retornar registro, pega o usuario externo e guarda no objeto
                        {
                            p = new Usuario();
                            p.Id = (int)reader["Id"];
                            p.Nome = reader["Nome"].ToString();

                            dados.Add(p);

                            // cria as sessões que podem ser usadas durante o desenvolvimento
                            HttpContext.Current.Session["login"] = login;

                            logado = true;
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    conn.Close();
                }


                return logado;
            }
        }

        public List<Usuario> Listar(int Id)
        {
            string consulta = @"SELECT     Id
                                          ,Nome
                                          ,Login
                                          ,Senha
                                                                               
                                    FROM Usuarios   ";
            if (Id > 0)
            {
                consulta = consulta + " Where Id =" + Id;

            }
            consulta = consulta + " ORDER BY Nome ";

            using (var conn = new SqlConnection(conexao))

            {
                var cmd = new SqlCommand(consulta, conn);
                List<Usuario> dados = new List<Usuario>();
                Usuario p = null;
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        while (reader.Read())
                        {
                            p = new Usuario();
                            p.Id = (int)reader["id"];
                            p.Nome = reader["Nome"].ToString();
                            p.Login = reader["Login"].ToString();
                            p.Senha = reader["Senha"].ToString();

                            dados.Add(p);
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                return dados;
            }
        }

        public void Salvar(Usuario p)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @" INSERT INTO 
                                       Usuarios
                                      (    Nome
                                          ,Login
                                          ,Senha
                                          )
                                VALUES (   @Nome
                                          ,@Login
                                          ,@Senha
                                         )";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Nome", p.Nome);
                cmd.Parameters.AddWithValue("@Login", p.Login);
                cmd.Parameters.AddWithValue("@Senha",p.Senha);

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        public void Editar(Usuario p)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @"UPDATE 
                                Usuarios SET
                                      Nome =            @Nome,
                                      Login =        @Login,
                                      Senha =        @Senha
                                                
                                WHERE Id=@Id";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Id", p.Id);
                cmd.Parameters.AddWithValue("@Nome", p.Nome);
                cmd.Parameters.AddWithValue("@Login", p.Login);
                cmd.Parameters.AddWithValue("@Senha", p.Senha);

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        public void Exclusao(int id)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = "DELETE Usuarios Where Id=@id";
                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    conn.Close();
                }
            }
        }
    }
}