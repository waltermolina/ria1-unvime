using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TestApi1.Models;

namespace TestApi1.Controllers
{
    public class StudentsController : ApiController
    {
        private AlumnosUNViMeEntities db = new AlumnosUNViMeEntities();

        // GET: api/Students
        public IQueryable<Student2> GetStudent2()
        {
            return db.Student2;
        }

        // GET: api/Students/5
        [ResponseType(typeof(Student2))]
        public IHttpActionResult GetStudent2(int id)
        {
            Student2 student2 = db.Student2.Find(id);
            if (student2 == null)
            {
                return NotFound();
            }

            return Ok(student2);
        }

        // PUT: api/Students/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudent2(int id, Student2 student2)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student2.IdStudent)
            {
                return BadRequest();
            }

            Student2 originalStudent = db.Student2.Find(id);
            if (originalStudent != null)
            {
                originalStudent.Career = student2.Career;
                originalStudent.File = student2.File;
                originalStudent.FirstName = student2.FirstName;
                originalStudent.LastName = student2.LastName;
                originalStudent.IdNumber = student2.IdNumber;
                originalStudent.StartYear = student2.StartYear;
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Student2Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Students
        [ResponseType(typeof(Student2))]
        public IHttpActionResult PostStudent2(Student2 student2)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Student2.Add(student2);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = student2.IdStudent }, student2);
        }

        // DELETE: api/Students/5
        [ResponseType(typeof(Student2))]
        public IHttpActionResult DeleteStudent2(int id)
        {
            Student2 student2 = db.Student2.Find(id);
            if (student2 == null)
            {
                return NotFound();
            }

            db.Student2.Remove(student2);
            db.SaveChanges();

            return Ok(student2);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Student2Exists(int id)
        {
            return db.Student2.Count(e => e.IdStudent == id) > 0;
        }
    }
}