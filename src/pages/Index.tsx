import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface Camera {
  id: string;
  name: string;
  status: "online" | "offline" | "warning";
  location: string;
}

interface Incident {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  location: string;
  time: string;
}

interface TrafficLight {
  id: string;
  intersection: string;
  status: "operational" | "maintenance" | "error";
  mode: "auto" | "manual";
}

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState<"security" | "transport">("security");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cameras: Camera[] = [
    { id: "CAM-001", name: "Центральная площадь", status: "online", location: "Пл. Революции, 1" },
    { id: "CAM-002", name: "Проспект Мира", status: "online", location: "Пр. Мира, 45" },
    { id: "CAM-003", name: "ТЦ Галерея", status: "warning", location: "Ул. Ленина, 12" },
    { id: "CAM-004", name: "Вокзал", status: "offline", location: "Привокзальная пл., 2" },
    { id: "CAM-005", name: "Парк Победы", status: "online", location: "Парковая ул., 8" },
    { id: "CAM-006", name: "Школа №5", status: "online", location: "Школьная ул., 15" },
  ];

  const incidents: Incident[] = [
    { id: "INC-001", type: "critical", title: "ДТП с пострадавшими", location: "Пр. Ленина × Ул. Кирова", time: "3 мин назад" },
    { id: "INC-002", type: "warning", title: "Подозрительный объект", location: "Центральный вокзал", time: "12 мин назад" },
    { id: "INC-003", type: "info", title: "Плановая проверка", location: "ТЦ Галерея", time: "25 мин назад" },
    { id: "INC-004", type: "warning", title: "Затор на дороге", location: "Кольцевая развязка", time: "35 мин назад" },
  ];

  const trafficLights: TrafficLight[] = [
    { id: "TL-001", intersection: "Пр. Мира × Ул. Ленина", status: "operational", mode: "auto" },
    { id: "TL-002", intersection: "Садовая × Кирова", status: "operational", mode: "auto" },
    { id: "TL-003", intersection: "Вокзальная × Пушкина", status: "maintenance", mode: "manual" },
    { id: "TL-004", intersection: "Кольцевая развязка", status: "error", mode: "manual" },
    { id: "TL-005", intersection: "Центральная пл.", status: "operational", mode: "auto" },
  ];

  const stats = {
    totalCameras: cameras.length,
    onlineCameras: cameras.filter(c => c.status === "online").length,
    activeIncidents: incidents.filter(i => i.type === "critical" || i.type === "warning").length,
    trafficFlow: 87,
    operationalLights: trafficLights.filter(t => t.status === "operational").length,
    totalLights: trafficLights.length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "operational":
        return "text-green-500";
      case "warning":
      case "maintenance":
        return "text-yellow-500";
      case "offline":
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getIncidentBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-red-500 hover:bg-red-600">Критично</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Внимание</Badge>;
      case "info":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Инфо</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Дашборд умного города
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString("ru-RU", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })} · {currentTime.toLocaleTimeString("ru-RU")}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab("security")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === "security"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground hover:bg-accent"
              }`}
            >
              <Icon name="Shield" className="inline mr-2" size={18} />
              Безопасность
            </button>
            <button
              onClick={() => setSelectedTab("transport")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === "transport"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground hover:bg-accent"
              }`}
            >
              <Icon name="Car" className="inline mr-2" size={18} />
              Транспорт
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Камеры онлайн
              </CardTitle>
              <Icon name="Video" className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats.onlineCameras}/{stats.totalCameras}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((stats.onlineCameras / stats.totalCameras) * 100)}% работоспособность
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Активные инциденты
              </CardTitle>
              <Icon name="AlertTriangle" className="text-destructive" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats.activeIncidents}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Требуют внимания
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Трафик
              </CardTitle>
              <Icon name="Activity" className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats.trafficFlow}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Загруженность дорог
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Светофоры
              </CardTitle>
              <Icon name="TrafficCone" className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats.operationalLights}/{stats.totalLights}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                В рабочем состоянии
              </p>
            </CardContent>
          </Card>
        </div>

        {selectedTab === "security" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Video" size={24} className="text-primary" />
                  Видеонаблюдение
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cameras.map((camera) => (
                    <div
                      key={camera.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          camera.status === "online" ? "bg-green-500" :
                          camera.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                        } animate-pulse`} />
                        <div>
                          <p className="font-medium text-foreground">{camera.name}</p>
                          <p className="text-xs text-muted-foreground">{camera.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getStatusColor(camera.status)}`}>
                          {camera.status === "online" ? "Онлайн" :
                           camera.status === "warning" ? "Внимание" : "Офлайн"}
                        </span>
                        <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={24} className="text-destructive" />
                  Инциденты и ЧП
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="p-3 rounded-lg bg-background/50 border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{incident.title}</h4>
                        {getIncidentBadge(incident.type)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Icon name="Clock" size={14} />
                        <span>{incident.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "transport" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrafficCone" size={24} className="text-primary" />
                  Светофоры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trafficLights.map((light) => (
                    <div
                      key={light.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          light.status === "operational" ? "bg-green-500" :
                          light.status === "maintenance" ? "bg-yellow-500" : "bg-red-500"
                        } animate-pulse`} />
                        <div>
                          <p className="font-medium text-foreground">{light.intersection}</p>
                          <p className="text-xs text-muted-foreground">
                            Режим: {light.mode === "auto" ? "Автоматический" : "Ручной"}
                          </p>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(light.status)}`}>
                        {light.status === "operational" ? "Работает" :
                         light.status === "maintenance" ? "Обслуживание" : "Ошибка"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" size={24} className="text-primary" />
                  Мониторинг трафика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Проспект Мира</span>
                      <span className="text-sm font-medium text-yellow-500">65%</span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: "65%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Кольцевая дорога</span>
                      <span className="text-sm font-medium text-red-500">92%</span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "92%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Улица Ленина</span>
                      <span className="text-sm font-medium text-green-500">38%</span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "38%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Центральная площадь</span>
                      <span className="text-sm font-medium text-yellow-500">71%</span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: "71%" }} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Icon name="Car" size={24} className="mx-auto mb-1 text-primary" />
                        <p className="text-2xl font-bold text-foreground">1,247</p>
                        <p className="text-xs text-muted-foreground">Авто/час</p>
                      </div>
                      <div>
                        <Icon name="Clock" size={24} className="mx-auto mb-1 text-primary" />
                        <p className="text-2xl font-bold text-foreground">8.3</p>
                        <p className="text-xs text-muted-foreground">мин задержка</p>
                      </div>
                      <div>
                        <Icon name="TrendingUp" size={24} className="mx-auto mb-1 text-primary" />
                        <p className="text-2xl font-bold text-foreground">+12%</p>
                        <p className="text-xs text-muted-foreground">чем вчера</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
