using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Base.Models.DAO
{
    public class EmpresaDAO
    {
        string conexao = WebConfigurationManager.ConnectionStrings["projetoBase"].ConnectionString;

        public List<Empresas> Listar(int Id)
        {
            string consulta = @"SELECT   Id 
                                        ,Uf 
                                        ,Cnpj 
                                        ,NomeFantasia                                                        
                                    FROM Empresa   ";
            if(Id > 0)
            {
                consulta = consulta + " Where Id =" + Id;

            }
            consulta = consulta + " ORDER BY NomeFantasia";

            using (var conn = new SqlConnection(conexao))

            {
                var cmd = new SqlCommand(consulta, conn);
                List<Empresas> dados = new List<Empresas>();
                Empresas p = null;
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        while (reader.Read())
                        {
                            p = new Empresas();
                            p.Id = (int)reader["id"];
                            p.Uf = reader["Uf"].ToString();
                            p.Cnpj = reader["Cnpj"].ToString();
                            p.NomeFantasia = reader["NomeFantasia"].ToString().ToUpper();                          
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

        public void Salvar(Empresas p)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @" INSERT INTO 
                                       Empresa
                                       (Uf,Cnpj,NomeFantasia)
                                VALUES (@Uf,@Cnpj,@NomeFantasia)";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Uf", p.Uf);
                cmd.Parameters.AddWithValue("@Cnpj", p.Cnpj);
                cmd.Parameters.AddWithValue("@NomeFantasia", p.NomeFantasia);
               
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

        public void Editar(Empresas p)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @"UPDATE 
                                Empresa SET
                                Uf = @Uf
                                ,Cnpj = @Cnpj
                                ,NomeFantasia = @NomeFantasia
                                                                
                                WHERE Id=@Id";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Id", p.Id);
                cmd.Parameters.AddWithValue("@Uf", p.Uf);
                cmd.Parameters.AddWithValue("@Cnpj", p.Cnpj);
                cmd.Parameters.AddWithValue("@NomeFantasia", p.NomeFantasia);
              
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
                string sql = "DELETE Empresa Where Id=@id";
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