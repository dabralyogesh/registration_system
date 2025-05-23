"use client";
import React, { useEffect, useState } from "react";
import { registrationService } from "@/services/registrationService";
import { Course, Registration, Student } from "@/types/types";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { courseService } from "@/services/courseService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studentService } from "@/services/studentService";

export default function Registrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRegistrationModal, setNewRegistrationModal] = useState(false);
  useEffect(() => {
    async function fetchRegistrations() {
      try {
        setLoading(true);
        const registrations = await registrationService.getAllRegistrations();
        setRegistrations(registrations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setLoading(false);
      }
    }
    fetchRegistrations();
  }, []);

  useEffect(() => {
    async function fetchAvailableCourses() {
      try {
        setLoading(true);
        const courses = await courseService.getAllCourses();
        console.log("Courses", courses);
        setAllCourses([]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    }
    fetchAvailableCourses();
  }, []);

  useEffect(() => {
    async function fetchAvailableStudents() {
      try {
        setLoading(true);
        const students = await studentService.getAllStudents();
        setAllStudents(students);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    }
    fetchAvailableStudents();
  }, []);

  const handleDeleteConfirm = async (registation: Registration | null) => {
    if (!registation) return;
    await registrationService.deleteRegistrations(registation.id);
    setDeleteModalOpen(false);
    const registrations = await registrationService.getAllRegistrations();
    setRegistrations(registrations);
  };
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setNewRegistrationModal(true)}>
          Add Registration
        </Button>
      </div>
      {/* // Students information displayed here with name and email on table inside a card */}
      <Card className="p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        ) : (
          <Table>
            <TableHeader>
              {/* Table Header acquiring equal width */}
              <TableRow className="w-full">
                <TableHead className="w-1/4">Student ID</TableHead>
                <TableHead className="w-1/4">Course ID</TableHead>
                <TableHead className="w-1/4">Created At</TableHead>
                <TableHead className="w-1/4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="w-1/4">
                    {registration.student_id}
                  </TableCell>
                  <TableCell className="w-1/4">
                    {registration.course_id}
                  </TableCell>
                  <TableCell className="w-1/4">
                    {registration.created_at}
                  </TableCell>
                  <TableCell className="w-1/4">
                    <Button
                      onClick={() => {
                        setSelectedRegistration(registration);
                        setEditModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedRegistration(registration);
                        setDeleteModalOpen(true);
                      }}
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      {/* Delete Modal */}
      <Dialog
        open={deleteModalOpen}
        onOpenChange={() => setDeleteModalOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              registration and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleDeleteConfirm(selectedRegistration)}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit registration */}
      <Dialog open={editModalOpen} onOpenChange={() => setEditModalOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Registration</DialogTitle>
            <DialogDescription>
              Change the course for the student
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Course
              </Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCourses.map((course) => (
                      <SelectItem key={course.id} value={course.title}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* New Registration Modal */}
      <Dialog
        open={newRegistrationModal}
        onOpenChange={() => setNewRegistrationModal(false)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Registration</DialogTitle>
            <DialogDescription>
              Add a new registration from the list of students and courses
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Student
              </Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
