"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Contact = {
  id: string
  name: string
  phone: string
  email: string
}

type ContactFormProps = {
  initialData: Contact | null
  onSubmit: (contact: Contact | Omit<Contact, "id">) => void
  onCancel: () => void
}

export default function ContactForm({ initialData, onSubmit, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  })

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
          className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-emerald-500/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">
          Teléfono
        </Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+34 600 000 000"
          required
          className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-emerald-500/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
          required
          className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-emerald-500/50"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl"
        >
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-500/80 hover:bg-emerald-500 text-white rounded-xl">
          {initialData ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  )
}

