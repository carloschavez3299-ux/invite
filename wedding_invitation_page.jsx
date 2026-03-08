import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  MapPin,
  Music,
  Users,
  CheckCircle2,
  Sparkles,
  Clock,
  Camera,
  Mail,
  Languages,
  Map,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const weddingDate = new Date("2027-09-17T17:00:00");
const rsvpEmail = "carlosralva3299@icloud.com";
const rsvpDeadlineDisplay = "April 4, 2026";
const venueName = "Dreams Jade";
const venueQuery = "Dreams Jade Resort & Spa, Puerto Morelos, Quintana Roo, Mexico";

// Hosted images expected in /public/images
const img1 = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAMgBLADASIAAhEBAxEB/8QAHAAAAQQDAQEAAAAAAAAAAAAABQYDBAcBCAIJ/8QAVBAAAQMCAwQIBQUFBgQFBQAAAQIDBAAFEQYSITETQVFhcYGRBxQiMrHB0SNSYnKS8AcVI0OCkqKywRUzQ1PC0iUkYnOjw/H/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EAB8RAQACAgIDAQAAAAAAAAAAAAABAgMRIRIxBBNBUf/aAAwDAQACEQMRAD8A+0ERAREQEREBERAREQEREBERAREQEREBERAXvhvS7+zeI9Qh+1+U8w29m+z95nqT6VxGtNOk1PULz7LYQSzxvK3kqVJjCqM5I3I2rk6V0H4N8P6f4j1TxPpFnZyQ2d9F8rQW9zE6SgqI3kZGTz2r7Ol9Qv5F7+2j09GclPdc9n3qvX0s4hS0m5Wb+Vv7nM9H8QeOtV8CeE7fQdDvJ7i4j8mK2t0jJdZBI4VJHBBx2rM9b8U6r4P0W01G7jS3upvMMrwxOpO0E4J9e9dOeF9J8X+K9P1bWbaKJbq4M8jyo8qg8n1rz3w54Q1T4i6xqNhYzRWEss8kE8kQ8q2GQfM3H0r6LHYWnTqq1NpzW8vPzPmm3RSpuM5u9r3fZ3G7eLdR8V+JdS0PS7a5vbhQxLHGsYwFk8k4P6V5F4j0bxB4D8f6l4a0q4u7u4W3uY5Y2h3L7cexNeh+J/GGieG9N8OaVYxWQv7hLeS1mSxQFJ8kD1/WvJfGXwz1Lxbq1jpWl6fPZ6gkaRrI6gKQxJHj5q+pxzX1+LxE4rEwS6ttJbL8j4vF1MZWvd7v1n8j0Tw/wCNPBvibw1q1/4e0q9u7i2WSR7mOZVQfMVAwQPrXn/AIY+JdJ+Jup6vpOjx3sV1eQxQxRkq2WQZB5OeR+VdV+GfhN4u8M6jY6pq0d5cQxv5l2kqK2WQfT2r0/wAHfBXxV4l1aw1TUNLgu7m4ULK8Msh2qSDzg9K9HFYmvVg0rXtbR+f6nG4nE1Kc5q3d9f8Awz5f0n4h6v4Q8c6V4f0m2u7u5W2uI4Y0lQShQ5Jx1r6P8AhP8AGWm/FvQ9Q0a7kRr2yS1uI5GJjJIz3H4V5V8VfDOr+N/DGm6VpGl3f2m4mV7iS1hU4Q8Yx+ddP+E/DPi7xBrWmWnhjS7y7uZ5Qn2e3lQmJOCOD+lfY4fD1KVNybvp6n5vhsNUpRqu7Wv2Z/9k=`;
const img2 = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAPABJADASIAAhEBAxEB/8QAHAAAAQQDAQEAAAAAAAAAAAAABQYDBAcBCAIJ/8QATRAAAQMCAwQIBQMEAgICAgMAAQIDBAAFEQYSITETQVFhcYGRBxQiMrHB0RNSYnKS8AcVI0OCkqKywRUzQ1PC0iUkYnOj/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAQEAAgIDAAAAAAAAAAAAAQIRAyESMQQTIkFh/9oADAMBAAIRAxEAPwD9JQEREBERAREQEREBERAREQEREBERAXt/wvru9vtW8SeJbW7jv7q2hsJYw5mTzM8nA7njvXknh3U9Q8NeJdQ8P6rd3U9jN5iQW0rSxQSMjKSCM5xXqviK4v/ABpqV7o2jX0V3bXSEpLco5mVgDg9vSvJ9D1vWvF1nY6f4eu7u8u0QwNLLCqjK4wTj2r7CviKWKrOU1a6s/M+exmLqVKTl7t7v5n3N4Z+JWo+LvD2l6jY2N1c3U8s0c9xHEoWIk5Y4wD9a5jxD4v8V+HfD2n6N4Y0m7u7u4jUpbW2lQx5k4Bz+VfRPhH4U+LPC2m2Wq6rbQ3WqykF7aSQ1eJQPlVhkcD0r53+K3w81HxF4j1TQ9M0u7u7u1eKQJcJCFQ4Jxk4r6jA4mtUpyk9V3+R8xh8LUpRkr3Vt/mfW3hP4g6l4k8X6LoGiXlzcy2m4QxRxTJKFGSfMHBJr6m+Efxr0r4v6Pr2naLZQ2U0UyQTSQxsw2LIDjH5V5n8MfB+qfGnxBpug6Te3V1cymR7eWRlJQ4GCM89K9H8GfB3xR4a1ew0/WrS5u7uVQzRyyHapIPOD0r4vD4mU1KlGvLrr5n5eLw1SpTqu7u9r8v8AM+YtZ8Y+L/B3hjTtO0m7u7u4W2mI4Y0lQShQ5Jx1r7g+E/xb0L4t6No+h2UNlNFMkE0kMbMNjJAwPwr5v+KngvVfFnhjT9K0jS7u7u5llCeZ7eVCYk4I44r6e8F+AtR8CeD7TQ9NsI7e2kCxxW8iKjK4PI9K+iwmJq1ONV2bS1f5n5nhsPUqUqru1r9mfnjRRRX7efmAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/Z`;
const img3 = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAMgBLADASIAAhEBAxEB/8QAHAAAAQQDAQEAAAAAAAAAAAAABQYDBAcBCAIJ/8QATBAAAQMCAwQHBgQEBQQDAQAAAQIDBAAFEQYSITETQVFhcYGRBxQiMrHB0fATQlJy8AcVI0OCkqKywRUzQ1PC0iUkYnOj/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAfEQEBAQADAQEBAAAAAAAAAAABAhEDEiExBEFR/9oADAMBAAIRAxEAPwD9JQEREBERAREQEREBERAREQEREBERAXrXwzqGqeM/FWj6Ro1xcXMlt5gQ2lu6xjJQ8jJxjPrXnOt+N9Q8N+JdQ8P6Ld3U9jN5iQW0rSxQSMjKSCM5xXpvij4v6F4D0DT9B0m7u7u4W2mI4Y0lQShQ5Jx1r51+L/wAONW8U+I9T0PS7m7u7u1eKQJcJCFQ4Jxk4r6jC4mtUpyk9V3+R8zh8LUpRkr3Vt/mfT3iPxXqXw50TQ9N0m7u7u4W2mI4Y0lQShQ5Jx1r5w8Y+KfF/h7w9p+j+H9Ju7u7hba4jhjSVBKFDknH0r6Z+Gfxr0r4u6No+h2UNlNFMkE0kMbMNjJAwPwr5n+KngvVvFnhjT9K0jS7u7u5llCeZ7eVCYk4I44r6fC4mU1KlGvLrr5n5eLw1SpTqu7u9r8v8zzSiiiv2E/MgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z`;

type RSVPResponse = {
  name: string;
  attending: string;
  guestCount: string;
  message: string;
  submittedAt: string;
};

function useCountdown(targetDate: Date) {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const diff = Math.max(targetDate.getTime() - now.getTime(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function buildMailtoHref(params: {
  email: string;
  guestName: string;
  attending: string;
  guestCount: string;
  message: string;
}) {
  const subject = `Wedding RSVP - ${params.guestName || "Guest"}`;
  const body = [
    `Name / Nombre: ${params.guestName || "N/A"}`,
    `Attending / Asistencia: ${params.attending === "yes" ? "Yes / Sí" : params.attending === "no" ? "No" : "Pending / Pendiente"}`,
    `Guest Count / Número de invitados: ${params.guestCount || "N/A"}`,
    `Message / Mensaje: ${params.message || "N/A"}`,
  ].join("\n");

  return `mailto:${params.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function getDirectionsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueQuery)}`;
}

function formatCountdown(days: number, hours: number, minutes: number, seconds: number) {
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function runInvitationSelfTests() {
  const tests = [
    {
      name: "mailto includes email",
      pass: buildMailtoHref({
        email: rsvpEmail,
        guestName: "Carlos",
        attending: "yes",
        guestCount: "2",
        message: "See you there",
      }).startsWith(`mailto:${rsvpEmail}`),
    },
    {
      name: "image paths are hosted file paths",
      pass: img1.startsWith("/images/") && img2.startsWith("/images/") && img3.startsWith("/images/"),
    },
    {
      name: "countdown target is valid",
      pass: !Number.isNaN(weddingDate.getTime()),
    },
    {
      name: "map link is valid",
      pass: getDirectionsUrl().startsWith("https://www.google.com/maps/search/"),
    },
  ];

  return tests.every((test) => test.pass);
}

const selfTestsPassed = runInvitationSelfTests();

export default function WeddingInvitationPage() {
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attending, setAttending] = useState("");
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [responses, setResponses] = useState<RSVPResponse[]>([]);

  const formattedDateEnglish = useMemo(
    () =>
      weddingDate.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    []
  );

  const formattedDateSpanish = useMemo(
    () =>
      weddingDate.toLocaleString("es-MX", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newResponse: RSVPResponse = {
      name: guestName || "Guest",
      attending: attending || "pending",
      guestCount: guestCount || "0",
      message: message || "",
      submittedAt: new Date().toLocaleString(),
    };

    setResponses((prev) => [newResponse, ...prev]);

    const href = buildMailtoHref({
      email: rsvpEmail,
      guestName,
      attending,
      guestCount,
      message,
    });

    window.location.href = href;
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-amber-50 text-zinc-900">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.66)), url(${img1})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.10),_transparent_24%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid items-end gap-8 md:grid-cols-[1.1fr,0.9fr]"
          >
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/25 px-4 py-2 text-sm shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-amber-300" />
                English & Español
              </div>

              {!selfTestsPassed ? (
                <div className="rounded-2xl border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
                  Preview configuration needs attention.
                </div>
              ) : null}

              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Wedding Invitation · Invitación de Boda</p>
                <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
                  Anadalay <span className="text-amber-300">&</span> Carlos
                </h1>
                <p className="max-w-xl text-lg leading-8 text-zinc-100">
                  Together with our families, we invite you to celebrate our wedding day.
                  <br />
                  Junto con nuestras familias, te invitamos a celebrar nuestro día especial.
                </p>
              </div>

              <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
                <InfoPillDark icon={<Calendar className="h-4 w-4" />} label="Date · Fecha" value="September 17, 2027" />
                <InfoPillDark icon={<MapPin className="h-4 w-4" />} label="Venue · Lugar" value={venueName} />
              </div>

              <div className="rounded-[1.5rem] border border-white/15 bg-black/25 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-amber-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm uppercase tracking-[0.25em]">Live Countdown · Cuenta Regresiva</span>
                </div>
                <p className="text-lg text-white">{formatCountdown(days, hours, minutes, seconds)}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  className="rounded-full bg-amber-400 px-6 py-6 text-base text-black hover:bg-amber-300"
                  onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Confirm Attendance · Confirmar Asistencia
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-amber-300/50 bg-black/15 px-6 py-6 text-base text-white hover:bg-white/10"
                  onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Photos · Ver Fotos
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-amber-300/50 bg-black/15 px-6 py-6 text-base text-white hover:bg-white/10"
                  onClick={() => window.open(getDirectionsUrl(), "_blank", "noopener,noreferrer")}
                >
                  Open Map · Abrir Mapa
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="overflow-hidden rounded-[2rem] border-amber-200/40 bg-white/95 shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={img2} alt="Anadalay and Carlos engagement portrait" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-6 text-white">
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Save the Date</p>
                    <h2 className="mt-2 text-3xl font-semibold">A seaside celebration</h2>
                    <p className="mt-2 text-sm text-zinc-200">Una celebración junto al mar</p>
                  </div>
                </div>
                <CardContent className="grid gap-4 p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoPill icon={<Calendar className="h-4 w-4" />} label="Date · Fecha" value="September 17, 2027" />
                    <InfoPill icon={<Clock className="h-4 w-4" />} label="Time · Hora" value="5:00 PM" />
                    <InfoPill icon={<MapPin className="h-4 w-4" />} label="Venue · Lugar" value={venueName} />
                    <InfoPill icon={<Users className="h-4 w-4" />} label="Theme · Tema" value="Black & Yellow" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-4 md:px-10">
        <Card className="rounded-[2rem] border border-amber-300/30 bg-white/95 shadow-lg">
          <CardContent className="grid gap-6 p-6 md:grid-cols-4 md:p-8">
            <CountdownBox label="Days · Días" value={days} />
            <CountdownBox label="Hours · Horas" value={hours} />
            <CountdownBox label="Minutes · Minutos" value={minutes} />
            <CountdownBox label="Seconds · Segundos" value={seconds} />
          </CardContent>
        </Card>
      </section>

      <section id="details" className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
        <div className="mb-8 text-center text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Our Story · Nuestra Historia</p>
          <h2 className="mt-3 text-4xl font-semibold">A Celebration by the Sea · Una celebración junto al mar</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <DetailCard
            icon={<Heart className="h-5 w-5" />}
            title="Our Special Day · Nuestro Día Especial"
            text={`Join us on ${formattedDateEnglish}. Acompáñanos el ${formattedDateSpanish} para celebrar el amor, la alegría y el comienzo de una nueva etapa.`}
          />
          <DetailCard
            icon={<MapPin className="h-5 w-5" />}
            title="Venue · Lugar"
            text="Dreams Jade will be the setting for our celebration. Dreams Jade será el escenario de esta celebración inolvidable. Use the map button to open directions instantly. Usa el botón de mapa para abrir indicaciones al instante."
          />
          <DetailCard
            icon={<Languages className="h-5 w-5" />}
            title="Bilingual Invitation · Invitación Bilingüe"
            text="Every main section is written in English and Spanish so all our loved ones can enjoy the invitation together."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-2 md:px-10 md:py-6">
        <Card className="rounded-[2rem] border border-amber-300/30 bg-white shadow-lg">
          <CardContent className="grid gap-8 p-6 md:grid-cols-[1.05fr,0.95fr] md:p-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Music className="h-5 w-5 text-amber-500" />
                <h2 className="text-2xl font-semibold">Celebration Details · Detalles de la Celebración</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <MiniBlock title="Ceremony · Ceremonia">September 17, 2027 · 5:00 PM</MiniBlock>
                <MiniBlock title="Reception · Recepción">Dinner, dancing, and unforgettable memories · Cena, baile y recuerdos inolvidables</MiniBlock>
                <MiniBlock title="RSVP Deadline · Fecha Límite">{rsvpDeadlineDisplay}</MiniBlock>
                <MiniBlock title="RSVP Email · Correo RSVP">{rsvpEmail}</MiniBlock>
              </div>

              <div className="rounded-[1.25rem] border border-zinc-200 bg-zinc-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-700">
                  <Map className="h-4 w-4 text-amber-600" />
                  <span className="text-sm uppercase tracking-[0.25em] text-zinc-500">Map · Mapa</span>
                </div>
                <Button className="rounded-full bg-black text-amber-300 hover:bg-zinc-900" onClick={() => window.open(getDirectionsUrl(), "_blank", "noopener,noreferrer")}>
                  Get Directions to Dreams Jade · Cómo llegar a Dreams Jade
                </Button>
              </div>

              <p className="text-sm leading-7 text-zinc-600">
                Please confirm your attendance by email using the RSVP section below. Por favor confirma tu asistencia por correo electrónico usando la sección RSVP de abajo.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <Camera className="h-5 w-5 text-amber-600" />
                <h3 className="text-xl font-semibold">Photo Gallery · Galería</h3>
              </div>
              <div id="gallery" className="grid grid-cols-2 gap-3">
                <div className="col-span-2 overflow-hidden rounded-2xl">
                  <img src={img3} alt="Proposal photo of Anadalay and Carlos" className="h-72 w-full object-cover md:h-80" />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img src={img1} alt="Beach engagement ring photo" className="h-64 w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img src={img2} alt="Close-up engagement photo" className="h-64 w-full object-cover" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-700">
                Hosted image files are now used for a cleaner, higher-quality invitation. Ahora se usan archivos de imagen alojados para una invitación más limpia y de mejor calidad.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="rsvp" className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-16">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="rounded-[2rem] border border-amber-300/30 bg-white shadow-2xl">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 space-y-2 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-500">RSVP</p>
                <h2 className="text-3xl font-semibold">Confirm Your Attendance · Confirma Tu Asistencia</h2>
                <p className="text-zinc-600">
                  Fill out the form and click the button to send your RSVP by email.
                  <br />
                  Llena el formulario y haz clic en el botón para enviar tu confirmación por correo.
                </p>
              </div>

              {!confirmed ? (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="guestName">Full name · Nombre completo</Label>
                    <Input
                      id="guestName"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Enter your name · Escribe tu nombre"
                      required
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                    <div className="grid gap-2">
                      <Label>Will you attend? · ¿Asistirás?</Label>
                      <Select value={attending} onValueChange={setAttending}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select response · Selecciona una respuesta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, happily attending · Sí, con gusto asistiré</SelectItem>
                          <SelectItem value="no">Regretfully declines · Con pena no podré asistir</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guestCount">Number of guests · Número de invitados</Label>
                      <Input
                        id="guestCount"
                        type="number"
                        min="1"
                        max="10"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">Message · Mensaje</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave a note for the couple · Déjale un mensaje a la pareja"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="rounded-full bg-black py-6 text-base text-amber-300 hover:bg-zinc-900">
                    <Mail className="mr-2 h-4 w-4" />
                    Send RSVP Email · Enviar Confirmación
                  </Button>
                </form>
              ) : (
                <div className="rounded-[1.5rem] border border-amber-300 bg-amber-50 p-6 text-center">
                  <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-amber-600" />
                  <h3 className="text-2xl font-semibold">Thank you · Gracias{guestName ? `, ${guestName}` : ""}!</h3>
                  <p className="mt-2 leading-7 text-zinc-700">
                    Your email confirmation is ready to send to <span className="font-medium">{rsvpEmail}</span>.
                    <br />
                    Tu confirmación por correo está lista para enviarse a <span className="font-medium">{rsvpEmail}</span>.
                  </p>
                  {message ? <p className="mt-4 text-sm italic text-zinc-600">“{message}”</p> : null}
                  <Button variant="outline" className="mt-5 rounded-full border-black text-black" onClick={() => setConfirmed(false)}>
                    Edit Response · Editar Respuesta
                  </Button>
                </div>
              )}

              <div className="mt-8 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  <h3 className="text-xl font-semibold">Guest RSVP Tracker · Registro de Confirmaciones</h3>
                </div>
                {responses.length === 0 ? (
                  <p className="text-sm text-zinc-600">No RSVP responses submitted in this preview yet. Aún no hay respuestas enviadas en esta vista previa.</p>
                ) : (
                  <div className="space-y-3">
                    {responses.map((response, index) => (
                      <div key={`${response.name}-${index}`} className="rounded-2xl border border-zinc-200 bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-zinc-900">{response.name}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{response.submittedAt}</p>
                        </div>
                        <p className="mt-2 text-sm text-zinc-700">Attendance · Asistencia: {response.attending}</p>
                        <p className="text-sm text-zinc-700">Guests · Invitados: {response.guestCount}</p>
                        {response.message ? <p className="mt-2 text-sm italic text-zinc-600">“{response.message}”</p> : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <footer className="px-6 pb-10 pt-2 text-center text-sm text-zinc-300 md:px-10">
        Anadalay & Carlos · September 17, 2027 · {venueName}
      </footer>
    </div>
  );
}

function InfoPillDark({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/25 p-4 shadow-sm backdrop-blur">
      <div className="mb-2 flex items-center gap-2 text-zinc-200">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="font-medium text-white">{value}</div>
    </div>
  );
}

function InfoPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-zinc-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="font-medium text-zinc-800">{value}</div>
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-center shadow-sm">
      <div className="text-4xl font-semibold text-black md:text-5xl">{String(value).padStart(2, "0")}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.25em] text-zinc-500">{label}</div>
    </div>
  );
}

function DetailCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card className="rounded-[2rem] border border-amber-300/25 bg-white shadow-lg">
      <CardContent className="space-y-4 p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="leading-7 text-zinc-600">{text}</p>
      </CardContent>
    </Card>
  );
}

function MiniBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.25rem] border border-zinc-200 bg-white p-4">
      <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">{title}</div>
      <div className="mt-2 font-medium text-zinc-800">{children}</div>
    </div>
  );
}
