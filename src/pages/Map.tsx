import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parks, Park } from "@/data/parks";
import { MapPin, Navigation, Star, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Map = () => {
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);

  const handleGetDirections = (park: Park) => {
    // Simular redirección a mapas (en producción iría a Google Maps)
    window.open(`https://www.google.com/maps/search/?api=1&query=${park.coordinates.lat},${park.coordinates.lng}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-accessible py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Parques Cercanos
          </h1>
          <p className="text-xl text-muted-foreground">
            Encuentra espacios verdes para tu actividad física
          </p>
        </div>

        {/* Map Placeholder */}
        <Card className="mb-8 overflow-hidden border-2">
          <div className="relative bg-gradient-to-br from-accent/20 to-primary/20 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
              <p className="text-2xl font-semibold mb-2">Mapa Interactivo</p>
              <p className="text-lg text-muted-foreground max-w-md">
                Aquí se mostraría un mapa real con la ubicación de los parques cercanos
              </p>
            </div>
            
            {/* Simulated markers */}
            {parks.slice(0, 3).map((park, idx) => (
              <div
                key={park.id}
                className="absolute animate-pulse cursor-pointer hover:scale-125 transition-transform"
                style={{
                  top: `${25 + idx * 20}%`,
                  left: `${30 + idx * 15}%`,
                }}
                onClick={() => setSelectedPark(park)}
              >
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Parks List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Parques Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parks.map((park) => (
              <Card 
                key={park.id}
                className="border-2 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedPark(park)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-2xl flex-1">{park.name}</CardTitle>
                    <div className="flex items-center gap-1 bg-warning/10 px-3 py-1 rounded-full">
                      <Star className="w-5 h-5 fill-warning text-warning" />
                      <span className="font-semibold">{park.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {park.address}
                    </div>
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <Navigation className="w-5 h-5" />
                      {park.distance} de distancia
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">{park.description}</p>
                  
                  <div>
                    <p className="text-sm font-semibold mb-2 text-muted-foreground">
                      Instalaciones:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {park.facilities.map((facility, idx) => (
                        <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(park);
                    }}
                    size="lg"
                    className="w-full gap-2"
                  >
                    <Navigation className="w-5 h-5" />
                    Cómo llegar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Park Detail Dialog */}
        <Dialog open={!!selectedPark} onOpenChange={() => setSelectedPark(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-3xl flex items-center gap-3">
                {selectedPark?.name}
                <div className="flex items-center gap-1 bg-warning/10 px-3 py-1 rounded-full text-base">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span>{selectedPark?.rating}</span>
                </div>
              </DialogTitle>
              <DialogDescription className="text-lg space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {selectedPark?.address}
                </div>
                <div className="flex items-center gap-2 text-accent font-semibold">
                  <Navigation className="w-5 h-5" />
                  {selectedPark?.distance} de distancia
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="relative bg-gradient-to-br from-accent/20 to-primary/20 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <p className="text-lg font-semibold">Vista del mapa</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Descripción</h3>
                <p className="text-lg">{selectedPark?.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Instalaciones disponibles</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedPark?.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-lg">
                      <Check className="w-5 h-5 text-success" />
                      {facility}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <p className="text-lg">
                  💡 <strong>Consejo:</strong> Los mejores horarios para visitar son temprano en la mañana (7-9 AM) o al atardecer (5-7 PM) cuando las temperaturas son más agradables.
                </p>
              </div>

              <Button
                onClick={() => selectedPark && handleGetDirections(selectedPark)}
                size="lg"
                className="w-full gap-2 text-lg h-14"
              >
                <Navigation className="w-6 h-6" />
                Obtener direcciones
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Map;
