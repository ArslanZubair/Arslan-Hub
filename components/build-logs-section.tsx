"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Terminal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BuildLog = {
  date: string
  title: string
  content: string
  project?: string
  tags: string[]
  status?: 'completed' | 'in-progress' | 'planned'
  impact?: string
  challenges?: string[]
  nextSteps?: string[]
}

const buildLogs: BuildLog[] = [
  {
    date: "Aug 2025",
    title: "PixelNova Studio – Creative Portfolio Website",
    content: "A fully responsive portfolio website designed to showcase creative services and projects with a professional, modern layout. Built to highlight design work, services, and easy client engagement.",
    project: "PixelNova Studio",
    tags: ["Portfolio", "Web Design", "UI/UX", "Responsive Design"],
    status: "completed",
    impact: "Enhanced online presence for creatives and agencies, providing a professional platform to display work and attract potential clients",
    challenges: ["Ensuring the site was fully responsive across devices and balancing performance with visual appeal."],
    nextSteps: ["Add animations, integrate a blog/updates section, and explore backend features for dynamic project management."]
  },
  {
    date: "Jan 2025",
    title: "AD Studios – Creative & Visual Agency Website",
    content: "A modern, visually engaging website for a creative agency specializing in digital branding, entertainment, and design services. The layout prioritizes clarity, aesthetic appeal, and user-friendly navigation.",
    project: "AD Studios Website",
    tags: ["Agency Website", "Web Design", "UI/UX", "Branding"],
    status: "completed",
    impact: "Elevates agency’s online presence by showcasing services and portfolio, making it easier for clients to engage and explore offerings.",
    challenges: ["Balancing strong visual design with responsive performance, crafting a layout that clearly distinguishes services, and ensuring seamless contact accessibility."],
    nextSteps: ["Incorporate case studies or client testimonials, add animations for interactivity, and potentially integrate CMS or blog functionality for dynamic updates."]
  },
  {
    date: "Aug 2025",
    title: "Dan’s Portfolio – UI/UX & Graphic Design Showcase",
    content: "A personal portfolio website that introduces me as a UI/UX and graphic designer. It highlights my creativity, tools, education, experience, and services, along with visual project examples and contact details.",
    project: "Client's Portfolio",
    tags: ["React.js","Node.js","Graphic Design", "UI/UX", "Web Design"],
    status: "in-progress",
    impact: "Provides a clear, professional online presence that showcases my skills and design philosophy, while allowing visitors to explore my work and get in touch easily.",
    challenges: ["Organizing diverse content—like skills, tools, experiences, and projects—into a cohesive and navigable layout, and ensuring consistency across sections."],
    nextSteps: ["Add more project examples, integrate interactive elements or animations, optimize performance and responsiveness, and include a blog or case study section."]
  },
  {
    date: "Dec 2024",
    title: "AI Document Summarizer – Streamlit App",
    content: "A Streamlit web app that allows users to upload documents and receive concise AI-generated summaries instantly, using OpenAI’s GPT-3.5 under the hood.",
    project: "AI Document Summarizer Tool",
    tags: ["Next.js", "Appwrite", "Streamlit", "AI","OpenAI", "Web App"],
    status: "completed",
    impact: "Boosts productivity by delivering quick summaries of documents for professionals and students, simplifying information digestion.",
    challenges: ["Handling various document formats and ensuring fast, accurate summaries with seamless UX in a Streamlit environment."],
    nextSteps: ["Add support for more file types, implement user authentication, improve UI with progress indicators, and enable exporting summaries."]
  }

]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export default function BuildLogsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<BuildLog | null>(null)

  const projects = Array.from(new Set(buildLogs.map(log => log.project).filter(Boolean)))

  const filteredLogs = buildLogs.filter(log => {
    const matchesSearch =
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesProject = selectedProject === "all" || log.project === selectedProject
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus

    return matchesSearch && matchesProject && matchesStatus
  })

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/30'
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30'
      case 'planned':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
      default:
        return 'bg-primary/10 text-primary border-primary/30'
    }
  }

  return (
    <section id="build-logs" className="py-20 md:py-32">
      <div className="container max-w-5xl">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-5xl font-bold">
              <span className="font-mono text-primary">#</span> Build Logs
            </h2>
            <Terminal className="text-chart-2 h-8 w-8" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Raw, unfiltered updates from my dev journey. Real projects, real challenges, real progress.
          </p>
        </div>


        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project} value={project || ""}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs */}
        <div className="space-y-6">
          {filteredLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="bg-card/70 backdrop-blur transition-all duration-300 hover:border-primary/30 cursor-pointer"
                onClick={() => setSelectedLog(log)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(log.date)}</span>
                    </div>

                    <div className="flex gap-2">
                      {log.status && (
                        <Badge
                          variant="outline"
                          className={cn("text-xs", getStatusColor(log.status))}
                        >
                          {log.status}
                        </Badge>
                      )}

                      {log.project && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          {log.project}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-2">{log.title}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line line-clamp-3">{log.content}</p>
                </CardContent>

                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {log.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedLog?.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{selectedLog?.date && formatDate(selectedLog.date)}</span>
              </div>
              {selectedLog?.project && (
                <Badge variant="outline" className="text-xs">{selectedLog.project}</Badge>
              )}
              {selectedLog?.status && (
                <Badge variant="outline" className={cn("text-xs", getStatusColor(selectedLog.status))}>
                  {selectedLog.status}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {selectedLog?.content}
              </p>
            </div>

            {selectedLog?.impact && (
              <div className="space-y-2">
                <h3 className="font-semibold">Impact</h3>
                <p className="text-muted-foreground">
                  {selectedLog.impact}
                </p>
              </div>
            )}

            {selectedLog?.challenges && selectedLog.challenges.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Challenges</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {selectedLog.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedLog?.nextSteps && selectedLog.nextSteps.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Next Steps</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {selectedLog.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {selectedLog?.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLog(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
