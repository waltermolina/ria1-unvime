//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestApi1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Career
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Career()
        {
            this.Student2 = new HashSet<Student2>();
        }
    
        public int IdCareer { get; set; }
        public string CareerName { get; set; }
        public int IdSchool { get; set; }
    
        public virtual School School { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Student2> Student2 { get; set; }
    }
}
