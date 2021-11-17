using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Szakdoga.Migrations
{
    public partial class DB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Felulvizsgalatok",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    penztargepid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Felulvizsgalatok", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Penztargepek",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ap = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tipusId = table.Column<int>(type: "int", nullable: false),
                    szemelyId = table.Column<int>(type: "int", nullable: false),
                    beuzemeles = table.Column<DateTime>(type: "datetime2", nullable: false),
                    telephelyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Penztargepek", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Szekhelyek",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    irsz = table.Column<int>(type: "int", nullable: false),
                    varos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    utca = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hsz = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Szekhelyek", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Szemelyek",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nev = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    szekhelyId = table.Column<int>(type: "int", nullable: false),
                    adoszam = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    telefon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Szemelyek", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Telephelyek",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    irsz = table.Column<int>(type: "int", nullable: false),
                    varos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    utca = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hsz = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Telephelyek", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Felulvizsgalatok");

            migrationBuilder.DropTable(
                name: "Penztargepek");

            migrationBuilder.DropTable(
                name: "Szekhelyek");

            migrationBuilder.DropTable(
                name: "Szemelyek");

            migrationBuilder.DropTable(
                name: "Telephelyek");
        }
    }
}
