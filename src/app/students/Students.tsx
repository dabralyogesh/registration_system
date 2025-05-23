"use client";
import React, { useEffect, useState } from "react";
import { studentService } from "@/services/studentService";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Course, Student } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SelectTrigger } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { courseService } from "@/services/courseService";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [openRegistratioModal, setOpenRegistratioModal] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      const students = await studentService.getAllStudents();
      setStudents(students);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    async function fetchAvailableCourses() {
      try {
        setLoading(true);
        const courses = await courseService.getAllCourses();
        console.log("Courses", courses);
        setAllCourses(courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    }
    fetchAvailableCourses();
  }, []);

  return (
    // Students information displayed here with name and email on table inside a card
    <>
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
                <TableHead className="w-1/3">Name</TableHead>
                <TableHead className="w-1/3">Email</TableHead>
                <TableHead className="w-1/3">Courses</TableHead>
                <TableHead className="w-1/3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="w-1/3">{student.name}</TableCell>
                  <TableCell className="w-1/3">{student.email}</TableCell>
                  <TableCell className="w-1/3">{0}</TableCell>
                  <TableCell className="w-1/3">
                    <Button onClick={() => setOpenRegistratioModal(true)}>
                      Register
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      <Dialog
        open={openRegistratioModal}
        onOpenChange={() => setOpenRegistratioModal(false)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new course</DialogTitle>
            <DialogDescription>Add a new course for yourself</DialogDescription>
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
            <Button type="submit">Register</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
