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
    public class FornecedorDAO
    {

        string conexao = WebConfigurationManager.ConnectionStrings["projetoBase"].ConnectionString;

        public List<Fornecedores> Listar(int Id, string nome, string cnpj, string data)
        {
            string consulta = @"SELECT     f.Id
                                          ,f.Nome
                                          ,f.Cpf_Cnpj
                                          ,f.Data_Criacao
                                          ,f.Telefone
                                          ,f.Id_Empresa
                                          ,f.Data_Nascimento
                                          ,f.RG      
                                          ,e.NomeFantasia
                                    FROM Fornecedor f
                                    LEFT JOIN Empresa e ON (e.Id = f.Id_Empresa) 
                                    Where 1=1";
            if (Id > 0)
            {
                consulta = consulta + " and f.Id =" + Id;

            }

            if (!string.IsNullOrEmpty(nome))
            {
                consulta = consulta + " and f.Nome like '%" + nome +"%'";

            }
            if (!string.IsNullOrEmpty(cnpj))
            {
                consulta = consulta + " and f.Cpf_Cnpj like'%" + cnpj +"%'";

            }
            if (!string.IsNullOrEmpty(data))
            {
                consulta = consulta + " and f.Data_Criacao ='" + Convert.ToDateTime(data).ToString("yyyy-MM-dd") +"'";

            }
            consulta = consulta + " ORDER BY f.Nome ";

            using (var conn = new SqlConnection(conexao))

            {
                var cmd = new SqlCommand(consulta, conn);
                List<Fornecedores> dados = new List<Fornecedores>();
                Fornecedores p = null;
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        while (reader.Read())
                        {
                            p = new Fornecedores();
                            p.Id = (int)reader["id"];
                            p.Nome = reader["Nome"].ToString();
                            p.Cpf_Cnpj = reader["Cpf_Cnpj"].ToString();
                            p.Data_Criacao = Convert.ToDateTime(reader["Data_Criacao"]).ToString("dd/MM/yyyy");
                            p.Id_Empresa = (int)reader["Id_Empresa"];
                            p.Data_Nascimento = Convert.ToDateTime(reader["Data_Nascimento"]).ToString("dd/MM/yyyy");
                            p.NomeEmpresa = reader["NomeFantasia"].ToString();
                            p.Telefone = reader["Telefone"].ToString();
                            p.RG = reader["RG"].ToString();
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

        public void Salvar(Fornecedores p)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @" INSERT INTO 
                                       Fornecedor
                                      ( Nome
                                       ,Cpf_Cnpj
                                       ,Data_Criacao
                                       ,Telefone
                                       ,Id_Empresa
                                       ,Data_Nascimento
                                       ,RG)
                                VALUES (@Nome
                                       ,@Cpf_Cnpj
                                       ,GetDate()
                                       ,@Telefone
                                       ,@Id_Empresa
                                       ,@Data_Nascimento
                                       ,@RG)";

                SqlCommand cmd = new SqlCommand(sql, conn);

                cmd.Parameters.AddWithValue("@Nome", p.Nome);
                cmd.Parameters.AddWithValue("@Cpf_Cnpj", p.Cpf_Cnpj);
                cmd.Parameters.AddWithValue("@Telefone", p.Telefone);
                cmd.Parameters.AddWithValue("@Id_Empresa", p.Id_Empresa);
                cmd.Parameters.AddWithValue("@Data_Nascimento", p.Data_Nascimento is null ? "" : Convert.ToDateTime(p.Data_Nascimento).ToString("yyyy-MM-dd"));
                cmd.Parameters.AddWithValue("@RG", p.RG is null ? "" : p.RG);             

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

        public void Editar(Fornecedores p)
        {
            using (var conn = new SqlConnection(conexao))
            {
                string sql = @"UPDATE 
                                Fornecedor SET
                                      Nome =            @Nome,
                                      Cpf_Cnpj =        @Cpf_Cnpj,
                                      Telefone =        @Telefone,
                                      Id_Empresa =      @Id_Empresa,
                                      Data_Nascimento=  @Data_Nascimento
                                                                
                                WHERE Id=@Id";

                SqlCommand cmd = new SqlCommand(sql, conn);
                           
                cmd.Parameters.AddWithValue("@Id", p.Id);
                cmd.Parameters.AddWithValue("@Nome", p.Nome);
                cmd.Parameters.AddWithValue("@Cpf_Cnpj", p.Cpf_Cnpj);
                //cmd.Parameters.AddWithValue("@Data_Criacao", DateTime.Now);
                cmd.Parameters.AddWithValue("@Telefone", p.Telefone);
                cmd.Parameters.AddWithValue("@Id_Empresa", p.Id_Empresa);
                cmd.Parameters.AddWithValue("@Data_Nascimento", p.Data_Nascimento is null ? "" : Convert.ToDateTime(p.Data_Nascimento).ToString("yyyy-MM-dd"));
                cmd.Parameters.AddWithValue("@RG", p.RG is null ? "" : p.RG);

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
                string sql = "DELETE Fornecedor Where Id=@id";
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