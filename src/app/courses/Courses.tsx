"use client";
import React, { useEffect, useState } from "react";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/types";
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

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const courses = await courseService.getAllCourses();
      setCourses(courses);
      setLoading(false);
    }
    fetchCourses();
  }, []);
  return (
    <>
      <div className="flex justify-end  mb-4">
        <Button onClick={() => {}}>Add Course</Button>
      </div>
      {/* Students information displayed here with name and email on table inside */}
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
                <TableHead className="w-1/3">Id</TableHead>
                <TableHead className="w-1/3">Title</TableHead>
                <TableHead className="w-1/3">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="w-1/3">{course.id}</TableCell>
                  <TableCell className="w-1/3">{course.title}</TableCell>
                  <TableCell className="w-1/3">{course.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
}
