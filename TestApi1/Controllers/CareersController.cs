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
    public class CareersController : ApiController
    {
        private AlumnosUNViMeEntities db = new AlumnosUNViMeEntities();

        // GET: api/Careers
        public IQueryable<Career> GetCareers()
        {
            return db.Careers;
        }

        // GET: api/Careers/5
        [ResponseType(typeof(Career))]
        public IHttpActionResult GetCareer(int id)
        {
            Career career = db.Careers.Find(id);
            if (career == null)
            {
                return NotFound();
            }

            return Ok(career);
        }

        // PUT: api/Careers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCareer(int id, Career career)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != career.IdCareer)
            {
                return BadRequest();
            }

            db.Entry(career).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CareerExists(id))
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

        // POST: api/Careers
        [ResponseType(typeof(Career))]
        public IHttpActionResult PostCareer(Career career)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Careers.Add(career);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CareerExists(career.IdCareer))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = career.IdCareer }, career);
        }

        // DELETE: api/Careers/5
        [ResponseType(typeof(Career))]
        public IHttpActionResult DeleteCareer(int id)
        {
            Career career = db.Careers.Find(id);
            if (career == null)
            {
                return NotFound();
            }

            db.Careers.Remove(career);
            db.SaveChanges();

            return Ok(career);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CareerExists(int id)
        {
            return db.Careers.Count(e => e.IdCareer == id) > 0;
        }
    }
}