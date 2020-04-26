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
    public class WebMotorDAO
    {
        string conexao = WebConfigurationManager.ConnectionStrings["projetoBase"].ConnectionString;

        public List<WebMotor> Listar(int Id)
        {
            string consulta = @"SELECT [ID]
                                      ,[marca]
                                      ,[modelo]
                                      ,[versao]
                                      ,[ano]
                                      ,[quilometragem]
                                      ,[observacao]
                                  FROM [dbo].[tb_AnuncioWebmotors]  ";
            if (Id > 0)
            {
                consulta = consulta + " Where ID =" + Id;

            }
            consulta = consulta + " ORDER BY ID Desc";

            using (var conn = new SqlConnection(conexao))

            {
                var cmd = new SqlCommand(consulta, conn);
                List<WebMotor> dados = new List<WebMotor>();
                WebMotor p = null;
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        while (reader.Read())
                        {
                            p = new WebMotor();
                            p.Id = (int)reader["ID"];
                            p.Ano = (int)reader["ano"];
                            p.Marca = reader["marca"].ToString();
                            p.Modelo = reader["modelo"].ToString();
                            p.Versao = reader["versao"].ToString();
                            p.Quilometragem = reader["quilometragem"].ToString();
                            p.Observacao = reader["observacao"].ToString();


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

        public void Salvar(string marca, string modelo,string versao,int ano, string km, string obs)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @" INSERT INTO [dbo].[tb_AnuncioWebmotors]
                                       (
                                            [marca]
                                           ,[modelo]
                                           ,[versao]
                                           ,[ano]
                                           ,[quilometragem]
                                           ,[observacao]
                                        )                                 
                                VALUES (
                                            @marca
                                           ,@modelo
                                           ,@versao
                                           ,@ano
                                           ,@quilometragem
                                           ,@observacao
                                        )";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@marca", marca);
                cmd.Parameters.AddWithValue("@modelo", modelo);
                cmd.Parameters.AddWithValue("@versao", versao);
                cmd.Parameters.AddWithValue("@ano", ano);
                cmd.Parameters.AddWithValue("@quilometragem", km);
                if (String.IsNullOrEmpty(obs))
                {
                    cmd.Parameters.AddWithValue("@observacao", DBNull.Value);
                }
                else
                {
                    cmd.Parameters.AddWithValue("@observacao", obs);
                }

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

        public void Editar(int Id,string marca, string modelo, string versao, int ano, string km, string obs)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @" UPDATE [dbo].[tb_AnuncioWebmotors]
                                   SET [marca] = @marca
                                      ,[modelo] = @modelo
                                      ,[versao] = @versao
                                      ,[ano] = @ano
                                      ,[quilometragem] = @quilometragem
                                      ,[observacao] = @observacao                                                     
                                WHERE ID=@Id";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@marca", marca);
                cmd.Parameters.AddWithValue("@modelo", modelo);
                cmd.Parameters.AddWithValue("@versao", versao);
                cmd.Parameters.AddWithValue("@ano", ano);
                cmd.Parameters.AddWithValue("@quilometragem", km);
                if (String.IsNullOrEmpty(obs))
                {
                    cmd.Parameters.AddWithValue("@observacao", DBNull.Value);
                }
                else
                {
                    cmd.Parameters.AddWithValue("@observacao", obs);
                }
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
                string sql = "DELETE  FROM [tb_AnuncioWebmotors] Where ID=@id";
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