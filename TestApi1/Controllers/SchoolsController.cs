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
    public class SchoolsController : ApiController
    {
        private AlumnosUNViMeEntities db = new AlumnosUNViMeEntities();

        // GET: api/Schools
        /// <summary>
        /// Recupera la lista de Escuelas.
        /// </summary>
        public IQueryable<School> GetSchools()
        {
            return db.Schools;
        }

        // GET: api/Schools/5
        /// <summary>
        /// Recupera una Escuela por id.
        /// </summary>
        /// <param name="id">El ID de la Escuela.</param>
        [ResponseType(typeof(School))]
        public IHttpActionResult GetSchool(int id)
        {
            School school = db.Schools.Find(id);
            if (school == null)
            {
                return NotFound();
            }

            return Ok(school);
        }

        // PUT: api/Schools/5
        /// <summary>
        /// Actualiza una Escuela.
        /// </summary>
        /// <param name="id">El ID de la Escuela.</param>
        /// <param name="school">Un objeto de tipo School con los datos de la Escuela a editar</param>
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSchool(int id, School school)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != school.IdSchool)
            {
                return BadRequest();
            }

            db.Entry(school).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SchoolExists(id))
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

        // POST: api/Schools
        /// <summary>
        /// Crea una nueva Escuela.
        /// </summary>
        /// <param name="school">Un objeto de tipo School con los datos de la Escuela a editar</param>
        [ResponseType(typeof(School))]
        public IHttpActionResult PostSchool(School school)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Schools.Add(school);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (SchoolExists(school.IdSchool))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = school.IdSchool }, school);
        }

        // DELETE: api/Schools/5
        /// <summary>
        /// Elimina una Escuela.
        /// </summary>
        /// <param name="id">El ID de la Escuela.</param>
        [ResponseType(typeof(School))]
        public IHttpActionResult DeleteSchool(int id)
        {
            School school = db.Schools.Find(id);
            if (school == null)
            {
                return NotFound();
            }

            db.Schools.Remove(school);
            db.SaveChanges();

            return Ok(school);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SchoolExists(int id)
        {
            return db.Schools.Count(e => e.IdSchool == id) > 0;
        }
    }
}