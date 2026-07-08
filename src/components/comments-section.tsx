"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import {
  MessageSquare,
  Send,
  LogIn,
  LogOut,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

interface Comment {
  id: string
  user_id: string
  user_name: string
  user_avatar: string
  message: string
  created_at: string
}

type Notification = {
  type: "success" | "error"
  message: string
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const commentVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function CommentsSection() {
  const [user, setUser] = useState<User | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState<Notification | null>(null)

  const showNotification = (type: Notification["type"], message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const loadComments = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setComments(data ?? [])
    } catch {
      showNotification("error", "Error al cargar comentarios")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadComments()
  }, [])

  const handleLogin = async (provider: "github" | "google") => {
    if (!supabase) return
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider })
      if (error) throw error
    } catch {
      showNotification("error", "Error al iniciar sesión")
    }
  }

  const handleLogout = async () => {
    if (!supabase) return
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch {
      showNotification("error", "Error al cerrar sesión")
    }
  }

  const handleSubmit = async () => {
    if (!user || !newMessage.trim() || !supabase) return

    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          user_id: user.id,
          user_name:
            user.user_metadata?.full_name ??
            user.user_metadata?.name ??
            user.email?.split("@")[0] ??
            "Anónimo",
          user_avatar: user.user_metadata?.avatar_url ?? "",
          message: newMessage.trim(),
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      if (data) {
        setComments((prev) => [data as unknown as Comment, ...prev])
      }
      setNewMessage("")
      showNotification("success", "Comentario publicado")
    } catch {
      showNotification("error", "Error al publicar comentario")
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const userName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    ""
  const userAvatar = user?.user_metadata?.avatar_url ?? ""

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {notification && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
              notification.type === "success"
                ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20"
                : "bg-red-900/30 text-red-400 border border-red-800/30"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
        {user ? (
          <>
            <div className="flex items-center gap-3">
              {userAvatar && (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-10 h-10 rounded-full border border-cyber-green/30"
                />
              )}
              <span className="text-sm font-medium text-cyber-white">
                {userName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-zinc-400">
              Iniciá sesión para comentar
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleLogin("github")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyber-black bg-cyber-green rounded-md hover:bg-cyber-green-dark transition-colors cursor-pointer"
              >
                <LogIn size={14} />
                GitHub
              </button>
              <button
                onClick={() => handleLogin("google")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyber-black bg-cyber-green rounded-md hover:bg-cyber-green-dark transition-colors cursor-pointer"
              >
                <LogIn size={14} />
                Google
              </button>
            </div>
          </>
        )}
      </div>

      {user && (
        <div className="space-y-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribí tu comentario..."
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-cyber-white placeholder-zinc-600 focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/20 resize-none transition-colors"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-600">
              {newMessage.length}/500
            </span>
            <button
              onClick={handleSubmit}
              disabled={!newMessage.trim() || submitting}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-cyber-black bg-cyber-green rounded-md hover:bg-cyber-green-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Send size={14} />
              {submitting ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-cyber-green/30 border-t-cyber-green rounded-full animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 py-12 text-center"
          >
            <MessageSquare size={32} className="text-zinc-700" />
            <p className="text-sm text-zinc-600">
              No hay comentarios aún. ¡Sé el primero!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                variants={commentVariants}
                className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {comment.user_avatar && (
                    <img
                      src={comment.user_avatar}
                      alt={comment.user_name}
                      className="w-8 h-8 rounded-full border border-zinc-700 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-cyber-white truncate">
                        {comment.user_name}
                      </span>
                      <span className="text-xs text-zinc-600 flex-shrink-0">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed break-words">
                      {comment.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
