"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Search,
  MapPin,
  Users,
  Trophy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Team {
  id: string;
  name: string;
  logo: string | null;
  city: string | null;
  category: string | null;
}

export default function ClubesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [clubs, setClubs] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar clubes desde la API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch("/api/admin/team");
        if (res.ok) {
          const data = await res.json();
          setClubs(data);
        }
      } catch (error) {
        console.error("Error cargando clubes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  // Categorías únicas dinámicas
  const allCategories = [...new Set(clubs.map((club) => club.category).filter(Boolean) as string[])];
  const categories = ["todos", ...allCategories];

  // Filtrar clubes
  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (club.city && club.city.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "todos" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Colores para las categorías
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Adulto: "bg-green-100 text-green-700",
      "Primera A": "bg-green-100 text-green-700",
      "Primera B": "bg-blue-100 text-blue-700",
      Juvenil: "bg-amber-100 text-amber-700",
      "Sub-20": "bg-amber-100 text-amber-700",
      "Sub-17": "bg-orange-100 text-orange-700",
      Infantil: "bg-purple-100 text-purple-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  // Contar municipios únicos
  const uniqueCities = new Set(clubs.map((c) => c.city).filter(Boolean)).size;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-3">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Clubes</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-1">
              <Shield className="h-8 w-8 text-[#fcd34d]" />
              <h1 className="text-3xl font-bold text-[#fcd34d]">Clubes</h1>
            </div>
            <p className="text-green-100">
              Conoce los clubes afiliados a la Liga Caldense de Fútbol
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{clubs.length}</div>
              <div className="text-sm text-gray-600">Clubes Activos</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{uniqueCities}</div>
              <div className="text-sm text-gray-600">Municipios</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg col-span-2 md:col-span-1">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{allCategories.length}</div>
              <div className="text-sm text-gray-600">Categorías</div>
            </CardContent>
          </Card>
        </div>

        {/* Barra de búsqueda y filtros */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Búsqueda */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar clubes por nombre o municipio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por categoría */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid de clubes */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredClubs.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== "todos"
                  ? "No se encontraron clubes con esos filtros"
                  : "No hay clubes registrados aún"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredClubs.map((club) => (
              <Card
                key={club.id}
                className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Barra de color superior */}
                  <div className="h-2 bg-gradient-to-r from-green-600 to-green-400" />

                  <div className="p-4">
                    {/* Header con logo y badge */}
                    <div className="flex items-start justify-between mb-3">
                      {club.logo ? (
                        <img
                          src={club.logo}
                          alt={club.name}
                          className="h-14 w-14 object-contain rounded-lg bg-white p-1 shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-7 w-7 text-green-600" />
                        </div>
                      )}
                      {club.category && (
                        <Badge
                          className={getCategoryColor(club.category)}
                          variant="secondary"
                        >
                          {club.category}
                        </Badge>
                      )}
                    </div>

                    {/* Nombre */}
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-lg">
                      {club.name}
                    </h3>

                    {/* Ciudad */}
                    {club.city && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span>{club.city}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-200">
            Liga Caldense de Fútbol &copy; 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
